/**
 * VOLTROLL Admin Panel - JavaScript
 * Handles content management and saving
 */

// ========================================
// Configuration
// ========================================

const CONFIG = {
    dataFile: 'data/config.json',
    imagesFolder: 'images/'
};

// ========================================
// State
// ========================================

let currentConfig = {};

// ========================================
// Initialize
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFormListeners();
    initImagePreviews();
    loadConfig();
    initSaveButton();
    initPreviewButton();
});

/**
 * Initialize navigation
 */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;
            navigateTo(sectionId);
        });
    });
}

/**
 * Navigate to section
 */
function navigateTo(sectionId) {
    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
        if (nav.dataset.section === sectionId) {
            nav.classList.add('active');
        }
    });
    
    // Show section
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update page title
    const pageTitle = document.getElementById('page-title');
    const titles = {
        'dashboard': '仪表盘',
        'hero': '首页设置',
        'models': '产品展示',
        'features': '核心特性',
        'specs': '技术规格',
        'order': '订购方案',
        'images': '图片管理'
    };
    if (pageTitle) {
        pageTitle.textContent = titles[sectionId] || '设置';
    }
}

/**
 * Initialize form listeners
 */
function initFormListeners() {
    // Auto-save on input changes (optional)
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('change', markAsUnsaved);
    });
}

/**
 * Initialize image previews
 */
function initImagePreviews() {
    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', function() {
            const previewId = this.name.replace('upload-', '') + '-preview';
            const preview = document.getElementById(previewId);
            if (preview && this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    preview.innerHTML = `<img src="${e.target.result}" alt="预览">`;
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    });
}

/**
 * Mark as unsaved
 */
function markAsUnsaved() {
    document.getElementById('save-btn').classList.add('unsaved');
}

/**
 * Load configuration
 */
async function loadConfig() {
    try {
        const response = await fetch(CONFIG.dataFile);
        if (!response.ok) {
            throw new Error('Failed to load config');
        }
        currentConfig = await response.json();
        populateForm();
        updateDashboard();
    } catch (error) {
        console.error('Error loading config:', error);
        showToast('加载配置失败，使用默认配置', 'error');
        currentConfig = getDefaultConfig();
        populateForm();
    }
}

/**
 * Get default configuration
 */
function getDefaultConfig() {
    return {
        site: {
            name: 'VOLTROLL',
            tagline: '电动三轮车 | 未来出行'
        },
        hero: {
            title: 'VOLTROLL Model S',
            subtitle: '重新定义城市出行',
            range: '120',
            rangeUnit: '公里续航',
            speed: '45',
            speedUnit: '最高时速',
            charge: '3',
            chargeUnit: '小时充电',
            cta: '立即订购',
            image: ''
        },
        models: [
            { id: 'model-s', title: 'Model S', description: '城市通勤的最佳选择，时尚与环保兼得', image: '' },
            { id: 'model-3', title: 'Model 3', description: '载货能力强，商业用途首选', image: '' }
        ],
        features: [
            { icon: '🔋', title: '超长续航', description: '一次充电，120公里无忧出行' },
            { icon: '⚡', title: '快速充电', description: '3小时满电出发' },
            { icon: '🛡️', title: '安全防护', description: '多重安全保护系统' },
            { icon: '🌿', title: '绿色环保', description: '零排放，零污染' }
        ],
        specs: {
            motor: '1200W',
            battery: '72V 45Ah',
            range: '120km',
            speed: '45km/h',
            size: '2400×1100×1750mm',
            weight: '280kg'
        },
        order: {
            basic: { name: '基础版', price: '¥6,999', features: ['标准续航 80km', '基础配色', '1年质保'] },
            pro: { name: '专业版', price: '¥8,999', features: ['超长续航 120km', '全系配色', '2年质保', '免费安装'] },
            ultra: { name: '旗舰版', price: '¥12,999', features: ['续航 150km', '定制配色', '3年质保', '上门服务'] }
        },
        titles: {
            features: '核心特性',
            specs: '技术规格',
            order: '立即订购'
        },
        footer: {
            copyright: '© 2025 VOLTROLL. All rights reserved.'
        },
        version: '1.0.0',
        lastUpdated: new Date().toISOString().split('T')[0]
    };
}

/**
 * Populate form with current config
 */
function populateForm() {
    // Hero Section
    setInputValue('hero-title', currentConfig.hero?.title);
    setInputValue('hero-subtitle', currentConfig.hero?.subtitle);
    setInputValue('hero-range', currentConfig.hero?.range);
    setInputValue('hero-range-unit', currentConfig.hero?.rangeUnit);
    setInputValue('hero-speed', currentConfig.hero?.speed);
    setInputValue('hero-speed-unit', currentConfig.hero?.speedUnit);
    setInputValue('hero-charge', currentConfig.hero?.charge);
    setInputValue('hero-charge-unit', currentConfig.hero?.chargeUnit);
    
    // Models
    if (currentConfig.models) {
        currentConfig.models.forEach((model, index) => {
            setInputValue(`model-${index === 0 ? 's' : '3'}-title`, model.title);
            setInputValue(`model-${index === 0 ? 's' : '3'}-desc`, model.description);
        });
    }
    
    // Features
    if (currentConfig.features) {
        currentConfig.features.forEach((feature, index) => {
            setInputValue(`feature-${index + 1}-icon`, feature.icon);
            setInputValue(`feature-${index + 1}-title`, feature.title);
            setInputValue(`feature-${index + 1}-desc`, feature.description);
        });
    }
    
    // Specs
    if (currentConfig.specs) {
        Object.keys(currentConfig.specs).forEach(key => {
            setInputValue(`spec-${key}`, currentConfig.specs[key]);
        });
    }
    
    // Order
    if (currentConfig.order) {
        Object.keys(currentConfig.order).forEach(tier => {
            const order = currentConfig.order[tier];
            setInputValue(`order-${tier}-name`, order.name);
            setInputValue(`order-${tier}-price`, order.price);
            setInputValue(`order-${tier}-features`, order.features.join('\n'));
        });
    }
}

/**
 * Set input value
 */
function setInputValue(name, value) {
    const input = document.querySelector(`[name="${name}"]`);
    if (input) {
        input.value = value || '';
    }
}

/**
 * Update dashboard
 */
function updateDashboard() {
    const lastUpdated = document.getElementById('last-updated');
    const version = document.getElementById('version');
    
    if (lastUpdated) {
        lastUpdated.textContent = currentConfig.lastUpdated || '-';
    }
    if (version) {
        version.textContent = currentConfig.version || '-';
    }
}

/**
 * Initialize save button
 */
function initSaveButton() {
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveConfig);
    }
}

/**
 * Initialize preview button
 */
function initPreviewButton() {
    const previewBtn = document.getElementById('preview-btn');
    if (previewBtn) {
        previewBtn.addEventListener('click', () => {
            window.open('index.html', '_blank');
        });
    }
}

/**
 * Save configuration
 */
async function saveConfig() {
    // Collect form data
    collectFormData();
    
    // Update timestamp
    currentConfig.lastUpdated = new Date().toISOString().split('T')[0];
    
    try {
        // For browser environments, we'll use localStorage as a fallback
        // and provide download option for the JSON file
        localStorage.setItem('voltroll_config', JSON.stringify(currentConfig, null, 2));
        
        // Create downloadable file
        const blob = new Blob([JSON.stringify(currentConfig, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'config.json';
        a.click();
        URL.revokeObjectURL(url);
        
        showToast('配置已保存！点击确定更新服务器文件', 'success');
        
        // Note: In production, you'd send this to a backend API
        // For static sites, you might use git API or a simple file upload
        
    } catch (error) {
        console.error('Error saving config:', error);
        showToast('保存失败: ' + error.message, 'error');
    }
}

/**
 * Collect form data into config
 */
function collectFormData() {
    // Hero
    currentConfig.hero = currentConfig.hero || {};
    currentConfig.hero.title = getInputValue('hero-title');
    currentConfig.hero.subtitle = getInputValue('hero-subtitle');
    currentConfig.hero.range = getInputValue('hero-range');
    currentConfig.hero.rangeUnit = getInputValue('hero-range-unit');
    currentConfig.hero.speed = getInputValue('hero-speed');
    currentConfig.hero.speedUnit = getInputValue('hero-speed-unit');
    currentConfig.hero.charge = getInputValue('hero-charge');
    currentConfig.hero.chargeUnit = getInputValue('hero-charge-unit');
    
    // Models
    currentConfig.models = [
        {
            id: 'model-s',
            title: getInputValue('model-s-title'),
            description: getInputValue('model-s-desc'),
            image: document.getElementById('path-model-s')?.value || currentConfig.models?.[0]?.image || ''
        },
        {
            id: 'model-3',
            title: getInputValue('model-3-title'),
            description: getInputValue('model-3-desc'),
            image: document.getElementById('path-model-3')?.value || currentConfig.models?.[1]?.image || ''
        }
    ];
    
    // Features
    currentConfig.features = [];
    for (let i = 1; i <= 4; i++) {
        currentConfig.features.push({
            icon: getInputValue(`feature-${i}-icon`),
            title: getInputValue(`feature-${i}-title`),
            description: getInputValue(`feature-${i}-desc`)
        });
    }
    
    // Specs
    currentConfig.specs = {
        motor: getInputValue('spec-motor'),
        battery: getInputValue('spec-battery'),
        range: getInputValue('spec-range'),
        speed: getInputValue('spec-speed'),
        size: getInputValue('spec-size'),
        weight: getInputValue('spec-weight')
    };
    
    // Order
    currentConfig.order = {
        basic: {
            name: getInputValue('order-basic-name'),
            price: getInputValue('order-basic-price'),
            features: getInputValue('order-basic-features').split('\n').filter(f => f.trim())
        },
        pro: {
            name: getInputValue('order-pro-name'),
            price: getInputValue('order-pro-price'),
            features: getInputValue('order-pro-features').split('\n').filter(f => f.trim())
        },
        ultra: {
            name: getInputValue('order-ultra-name'),
            price: getInputValue('order-ultra-price'),
            features: getInputValue('order-ultra-features').split('\n').filter(f => f.trim())
        }
    };
}

/**
 * Get input value
 */
function getInputValue(name) {
    const input = document.querySelector(`[name="${name}"]`);
    return input ? input.value.trim() : '';
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.querySelector('.toast-message').textContent = message;
        toast.className = 'toast ' + type;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

/**
 * Navigate to section (global function)
 */
function navTo(sectionId) {
    navigateTo(sectionId);
}

// ========================================
// Image Upload Helper
// ========================================

/**
 * Handle image upload
 */
async function uploadImage(file, targetPath) {
    // This is a placeholder for actual upload logic
    // In production, you'd send to a backend API
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // For now, just return the data URL
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// ========================================
// Export for potential module use
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadConfig, saveConfig, getDefaultConfig };
}
