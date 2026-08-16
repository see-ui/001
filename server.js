const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// 配置 multer 存储：先保存为临时文件，稍后转换并重命名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'src', 'images'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, 'tmp-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static(__dirname)); // 提供静态文件

// 辅助函数：读取 products.js 中的数组
function readProductsFile() {
  const filePath = path.join(__dirname, 'data', 'products.js');
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/const productsData = (\[[\s\S]*\]);/);
  if (!match) {
    throw new Error('products.js 格式错误');
  }
  return new Function(`return ${match[1]};`)();
}

// 辅助函数：写入 products.js
function writeProductsFile(products) {
  const filePath = path.join(__dirname, 'data', 'products.js');
  const content = `const productsData = ${JSON.stringify(products, null, 4)};`;
  fs.writeFileSync(filePath, content, 'utf8');
}

// 辅助函数：读取 cases.js
function readCasesFile() {
  const filePath = path.join(__dirname, 'data', 'cases.js');
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/const productsCaseData = (\[[\s\S]*\]);/);
  if (!match) {
    throw new Error('cases.js 格式错误');
  }
  return new Function(`return ${match[1]};`)();
}

// 辅助函数：写入 cases.js
function writeCasesFile(cases) {
  const filePath = path.join(__dirname, 'data', 'cases.js');
  const content = `const productsCaseData = ${JSON.stringify(cases, null, 4)};`;
  fs.writeFileSync(filePath, content, 'utf8');
}

// 删除指定前缀的所有图片（支持单图和多图命名规则）
function deleteImagesByPrefix(prefix, excludeExt) {
  const imagesDir = path.join(__dirname, 'src', 'images');
  if (!fs.existsSync(imagesDir)) return;

  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^${escapedPrefix}(-\\d+)?\\.(jpg|jpeg|png|avif|webp|gif)$`, 'i');

  const files = fs.readdirSync(imagesDir);
  files.forEach(file => {
    if (regex.test(file)) {
      const ext = file.substring(file.lastIndexOf('.')).toLowerCase();
      if (excludeExt && ext === excludeExt) return;
      const filePath = path.join(imagesDir, file);
      try {
        fs.rmSync(filePath, { force: true, maxRetries: 3, retryDelay: 200 });
        console.log(`已删除图片: ${file}`);
      } catch (err) {
        console.warn(`删除图片失败（可忽略）: ${file} - ${err.message}`);
      }
    }
  });
}

// 安全删除文件（带重试，避免 Windows 文件占用问题）
function safeUnlink(filePath, retries = 3, delay = 200) {
  return new Promise((resolve) => {
    const attempt = (remaining) => {
      try {
        if (fs.existsSync(filePath)) {
          fs.rmSync(filePath, { force: true, maxRetries: 2, retryDelay: 100 });
        }
        resolve();
      } catch (err) {
        if (remaining > 0 && (err.code === 'EPERM' || err.code === 'EBUSY')) {
          setTimeout(() => attempt(remaining - 1), delay);
        } else {
          console.warn(`删除文件失败（将在启动时清理）: ${filePath} - ${err.message}`);
          resolve();
        }
      }
    };
    attempt(retries);
  });
}

// 启动时清理所有残留的 tmp- 临时文件
function cleanupTempFiles() {
  const imagesDir = path.join(__dirname, 'src', 'images');
  if (!fs.existsSync(imagesDir)) return;
  const files = fs.readdirSync(imagesDir);
  files.forEach(file => {
    if (file.startsWith('tmp-')) {
      const filePath = path.join(imagesDir, file);
      try {
        fs.rmSync(filePath, { force: true, maxRetries: 3, retryDelay: 200 });
        console.log(`已清理临时文件: ${file}`);
      } catch (err) {
        console.warn(`无法清理临时文件（可忽略）: ${file} - ${err.message}`);
      }
    }
  });
}

// 启动前清理
cleanupTempFiles();

// API：获取商品
app.get('/api/products', (req, res) => {
  try {
    const products = readProductsFile();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API：新增商品
app.post('/api/products', (req, res) => {
  try {
    const products = readProductsFile();
    const { titleEn, titleCn, price, category, badge, alt, imageExt, images } = req.body;
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = {
      id: newId,
      titleEn: titleEn || '',
      titleCn: titleCn || '',
      price: price || '',
      category: category || 'others',
      badge: badge || '',
      alt: alt || '',
      imageExt: imageExt || '.jpg',
      images: Array.isArray(images) ? images : []
    };
    products.push(newProduct);
    writeProductsFile(products);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API：修改商品
app.put('/api/products/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const products = readProductsFile();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: '商品不存在' });
    const { titleEn, titleCn, price, category, badge, alt, imageExt, images } = req.body;
    products[index] = {
      ...products[index],
      titleEn: titleEn !== undefined ? titleEn : products[index].titleEn,
      titleCn: titleCn !== undefined ? titleCn : products[index].titleCn,
      price: price !== undefined ? price : products[index].price,
      category: category !== undefined ? category : products[index].category,
      badge: badge !== undefined ? badge : products[index].badge,
      alt: alt !== undefined ? alt : products[index].alt,
      imageExt: imageExt !== undefined ? imageExt : products[index].imageExt,
      images: images !== undefined ? (Array.isArray(images) ? images : []) : products[index].images
    };
    writeProductsFile(products);
    res.json(products[index]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API：删除商品
app.delete('/api/products/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let products = readProductsFile();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: '商品不存在' });
    products = products.filter(p => p.id !== id);
    writeProductsFile(products);
    // 删除对应商品的所有图片（单图和多图）
    deleteImagesByPrefix(`p${id}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API：获取案例
app.get('/api/cases', (req, res) => {
  try {
    const cases = readCasesFile();
    res.json(cases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API：新增案例
app.post('/api/cases', (req, res) => {
  try {
    const cases = readCasesFile();
    const { tagEn, tagCn, titleEn, titleCn, descEn, descCn, originEn, originCn, imageExt } = req.body;
    const newId = cases.length ? Math.max(...cases.map(c => c.id)) + 1 : 1;
    const newCase = {
      id: newId,
      tagEn: tagEn || '',
      tagCn: tagCn || '',
      titleEn: titleEn || '',
      titleCn: titleCn || '',
      descEn: descEn || '',
      descCn: descCn || '',
      originEn: originEn || '',
      originCn: originCn || '',
      imageExt: imageExt || '.jpg'
    };
    cases.push(newCase);
    writeCasesFile(cases);
    res.status(201).json(newCase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API：修改案例
app.put('/api/cases/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cases = readCasesFile();
    const index = cases.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ error: '案例不存在' });
    const { tagEn, tagCn, titleEn, titleCn, descEn, descCn, originEn, originCn, imageExt } = req.body;
    cases[index] = {
      ...cases[index],
      tagEn: tagEn !== undefined ? tagEn : cases[index].tagEn,
      tagCn: tagCn !== undefined ? tagCn : cases[index].tagCn,
      titleEn: titleEn !== undefined ? titleEn : cases[index].titleEn,
      titleCn: titleCn !== undefined ? titleCn : cases[index].titleCn,
      descEn: descEn !== undefined ? descEn : cases[index].descEn,
      descCn: descCn !== undefined ? descCn : cases[index].descCn,
      originEn: originEn !== undefined ? originEn : cases[index].originEn,
      originCn: originCn !== undefined ? originCn : cases[index].originCn,
      imageExt: imageExt !== undefined ? imageExt : cases[index].imageExt
    };
    writeCasesFile(cases);
    res.json(cases[index]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API：删除案例
app.delete('/api/cases/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let cases = readCasesFile();
    const index = cases.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ error: '案例不存在' });
    cases = cases.filter(c => c.id !== id);
    writeCasesFile(cases);
    // 删除对应案例的所有图片
    deleteImagesByPrefix(`product${id}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API：上传图片并转换为 WebP
app.post('/api/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: '没有文件' });
  }

  const prefix = req.body.prefix;
  const tempPath = req.file.path;
  const finalExt = '.webp';
  const finalName = prefix + finalExt;
  const finalPath = path.join(__dirname, 'src', 'images', finalName);

  try {
    // 删除旧的目标文件（覆盖）
    await safeUnlink(finalPath);

    // 使用 sharp 转换图片到内存，再写入最终文件，减少文件占用时间
    const buffer = await sharp(tempPath)
      .webp({ quality: 80 })
      .toBuffer();
    fs.writeFileSync(finalPath, buffer);

    // 删除同前缀的其他格式旧图片（排除刚生成的 .webp）
    deleteImagesByPrefix(prefix, '.webp');

    // 先返回成功响应，延迟删除临时文件，减少文件占用
    const imagePath = `/src/images/${finalName}`;
    res.json({ path: imagePath });

    // 响应后延迟删除临时文件
    setTimeout(() => {
      safeUnlink(tempPath);
    }, 1000);

  } catch (err) {
    // 转换失败时删除临时文件
    await safeUnlink(tempPath);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`本地管理服务运行在 http://localhost:${PORT}`);
  console.log(`打开 http://localhost:${PORT}/admin.html 进入管理后台`);
});