/**
 * VOLTROLL - Main JavaScript
 * Handles website interactions and data loading
 */

// ========================================
// Configuration
// ========================================

const CONFIG = {
    dataUrl: 'data/config.json',
    animationDelay: 100,
    scrollThreshold: 100
};

// ========================================
// DOM Elements
// ========================================

const elements = {
    navbar: document.getElementById('navbar'),
    heroImage: document.getElementById('hero-image'),
    modelSImage: document.getElementById('model-s-image'),
    model3Image: document.getElementById('model-3-image')
};

// ========================================
// Initialize
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollAnimations();
    loadConfig();
    initSmoothScroll();
    initParallax();
});

/**
 * Initialize navbar scroll behavior
 */
function initNavbar() {
    if (!elements.navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            elements.navbar.classList.add('scrolled');
        } else {
            elements.navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Load configuration from JSON file
 */
async function loadConfig() {
    try {
        const response = await fetch(CONFIG.dataUrl);
        if (!response.ok) {
            throw new Error('Failed to load config');
        }
        const config = await response.json();
        applyConfig(config);
    } catch (error) {
        console.warn('Using default config:', error.message);
        // Apply default values
        applyConfig(getDefaultConfig());
    }
}

/**
 * Apply configuration to the page
 */
function applyConfig(config) {
    // Hero Section
    if (config.hero) {
        setText('hero-title', config.hero.title);
        setText('hero-subtitle', config.hero.subtitle);
        setText('stat-range', config.hero.range);
        setText('stat-speed', config.hero.speed);
        setText('stat-charge', config.hero.charge);
        
        if (config.hero.image) {
            setBackgroundImage('hero-image', config.hero.image);
        }
    }
    
    // Models
    if (config.models) {
        config.models.forEach((model, index) => {
            const prefix = index === 0 ? 'model-s' : index === 1 ? 'model-3' : `model-${index}`;
            setText(`${prefix}-title`, model.title);
            setText(`${prefix}-desc`, model.description);
            
            const imageEl = document.getElementById(`${prefix}-image`);
            if (imageEl && model.image) {
                setBackgroundImage(`${prefix}-image`, model.image);
            }
        });
    }
    
    // Features
    if (config.features) {
        config.features.forEach((feature, index) => {
            setText(`feature-${index + 1}-title`, feature.title);
            setText(`feature-${index + 1}-desc`, feature.description);
        });
    }
    
    // Specs
    if (config.specs) {
        Object.keys(config.specs).forEach(key => {
            const el = document.getElementById(`spec-${key}`);
            if (el) {
                el.textContent = config.specs[key];
            }
        });
    }
    
    // Order Options
    if (config.order) {
        ['basic', 'pro', 'ultra'].forEach((tier, index) => {
            if (config.order[tier]) {
                const order = config.order[tier];
                setText(`order-${tier}-name`, order.name);
                setText(`order-${tier}-price`, order.price);
                
                order.features.forEach((feature, fIndex) => {
                    setText(`order-${tier}-feature-${fIndex + 1}`, feature);
                });
            }
        });
    }
    
    // Section Titles
    if (config.titles) {
        Object.keys(config.titles).forEach(key => {
            setText(`${key}-title`, config.titles[key]);
        });
    }
}

/**
 * Set text content of an element
 */
function setText(id, text) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = text;
    }
}

/**
 * Set background image of an element
 */
function setBackgroundImage(id, imageUrl) {
    const el = document.getElementById(id);
    if (el) {
        el.style.backgroundImage = `url('${imageUrl}')`;
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
        el.innerHTML = ''; // Remove placeholder text
    }
}

/**
 * Get default configuration
 */
function getDefaultConfig() {
    return {
        hero: {
            title: 'VOLTROLL Model S',
            subtitle: '重新定义城市出行',
            range: '120',
            speed: '45',
            charge: '3',
            image: null
        },
        models: [
            { title: 'Model S', description: '城市通勤的最佳选择，时尚与环保兼得', image: null },
            { title: 'Model 3', description: '载货能力强，商业用途首选', image: null }
        ],
        features: [
            { title: '超长续航', description: '一次充电，120公里无忧出行' },
            { title: '快速充电', description: '3小时满电出发' },
            { title: '安全防护', description: '多重安全保护系统' },
            { title: '绿色环保', description: '零排放，零污染' }
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
            basic: {
                name: '基础版',
                price: '¥6,999',
                features: ['标准续航 80km', '基础配色', '1年质保']
            },
            pro: {
                name: '专业版',
                price: '¥8,999',
                features: ['超长续航 120km', '全系配色', '2年质保', '免费安装']
            },
            ultra: {
                name: '旗舰版',
                price: '¥12,999',
                features: ['续航 150km', '定制配色', '3年质保', '上门服务']
            }
        },
        titles: {
            features: '核心特性',
            specs: '技术规格',
            order: '立即订购'
        }
    };
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize parallax effect for hero section
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

// ========================================
// Utility Functions
// ========================================

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadConfig, applyConfig, getDefaultConfig };
}
