// components.js - OOP JavaScript untuk Komponen Reusable (FUNGSI SAJA)

/**
 * Class NavbarManager - Mengelola FUNGSI navbar dengan OOP (tidak membuat HTML)
 */
class NavbarManager {
    constructor() {
        this.isSticky = false;
        this.isMobileMenuOpen = false;
    }
    
    /**
     * Inisialisasi fungsi navbar
     */
    init() {
        this.addEventListeners();
        this.updateActiveLink();
    }
    
    /**
     * Menambahkan event listeners
     */
    addEventListeners() {
        // Toggle mobile menu
        const toggleBtn = document.getElementById('navbar-toggle');
        const mobileMenu = document.getElementById('navbar-mobile-menu');
        
        if (toggleBtn && mobileMenu) {
            toggleBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Sticky navbar on scroll
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
        
        // Close mobile menu when clicking a link
        const mobileLinks = document.querySelectorAll('.navbar-mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }
    
    /**
     * Mengelola scroll behavior
     */
    handleScroll() {
        const navbar = document.getElementById('main-navbar');
        if (!navbar) return;
        
        if (window.scrollY > 100 && !this.isSticky) {
            navbar.classList.add('sticky');
            this.isSticky = true;
        } else if (window.scrollY <= 100 && this.isSticky) {
            navbar.classList.remove('sticky');
            this.isSticky = false;
        }
    }
    
    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('navbar-mobile-menu');
        if (!mobileMenu) return;
        
        if (this.isMobileMenuOpen) {
            mobileMenu.classList.remove('active');
        } else {
            mobileMenu.classList.add('active');
        }
        
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
    
    /**
     * Menutup mobile menu
     */
    closeMobileMenu() {
        const mobileMenu = document.getElementById('navbar-mobile-menu');
        if (!mobileMenu) return;
        
        mobileMenu.classList.remove('active');
        this.isMobileMenuOpen = false;
    }
    
    /**
     * Update active link berdasarkan halaman saat ini
     */
    updateActiveLink() {
        const currentPage = window.location.pathname.split('/').pop();
        
        // Update desktop links
        const desktopLinks = document.querySelectorAll('.nav-link');
        desktopLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            link.classList.remove('active');
            
            if (currentPage === linkPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
        
        // Update mobile links
        const mobileLinks = document.querySelectorAll('.navbar-mobile-link');
        mobileLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            link.classList.remove('active');
            
            if (currentPage === linkPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
}

/**
 * Class FooterManager - Mengelola FUNGSI footer dengan OOP (tidak membuat HTML)
 */
class FooterManager {
    constructor() {}
    
    /**
     * Inisialisasi fungsi footer
     */
    init() {
        this.updateCurrentYear();
    }
    
    /**
     * Update tahun di copyright footer
     */
    updateCurrentYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}

/**
 * Class TabManager - Mengelola tab dengan OOP
 */
class TabManager {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.options = {
            tabs: [
                { id: 'passenger', label: 'Passenger', active: true },
                { id: 'canter', label: 'Canter', active: false },
                { id: 'fuso', label: 'Fuso', active: false }
            ],
            ...options
        };
        
        this.activeTab = this.options.tabs.find(tab => tab.active)?.id || this.options.tabs[0].id;
    }
    
    /**
     * Inisialisasi tab manager
     */
    init() {
        this.createTabs();
        this.addEventListeners();
        this.showTab(this.activeTab);
    }
    
    /**
     * Membuat struktur tab
     */
    createTabs() {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        
        // Tab header
        const tabHeader = document.createElement('div');
        tabHeader.className = 'tab-header';
        
        this.options.tabs.forEach(tab => {
            const button = document.createElement('button');
            button.className = `tab-button ${tab.active ? 'active' : ''}`;
            button.setAttribute('data-tab', tab.id);
            button.textContent = tab.label;
            tabHeader.appendChild(button);
        });
        
        container.appendChild(tabHeader);
        
        // Tab content containers
        this.options.tabs.forEach(tab => {
            const contentDiv = document.createElement('div');
            contentDiv.id = tab.id;
            contentDiv.className = `tab-content ${tab.active ? 'active' : ''}`;
            container.appendChild(contentDiv);
        });
    }
    
    /**
     * Menambahkan event listeners
     */
    addEventListeners() {
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                this.showTab(tabId);
            });
        });
    }
    
    /**
     * Menampilkan tab tertentu
     */
    showTab(tabId) {
        // Update active button
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-tab') === tabId) {
                button.classList.add('active');
            }
        });
        
        // Update active content
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
            }
        });
        
        this.activeTab = tabId;
    }
}

/**
 * Class ProductManager - Mengelola produk dengan OOP
 */
class ProductManager {
    constructor(containerId, products = []) {
        this.containerId = containerId;
        this.products = products;
    }
    
    /**
     * Inisialisasi product manager
     */
    init() {
        this.renderProducts();
    }
    
    /**
     * Render produk ke dalam container
     */
    renderProducts() {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        
        if (this.products.length === 0) {
            container.innerHTML = '<p class="text-center">Tidak ada produk untuk ditampilkan.</p>';
            return;
        }
        
        const productGrid = document.createElement('div');
        productGrid.className = 'product-grid';
        
        this.products.forEach(product => {
            const productCard = this.createProductCard(product);
            productGrid.appendChild(productCard);
        });
        
        container.innerHTML = '';
        container.appendChild(productGrid);
    }
    
    /**
     * Membuat card produk
     */
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price}</span>
                    <a href="${product.detailUrl || '#'}" class="btn-primary">Detail</a>
                </div>
            </div>
        `;
        
        return card;
    }
}

/**
 * Class LeadForm - Mengelola form lead dengan OOP
 */
class LeadForm {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.options = {
            title: 'Minta Penawaran & Test Drive',
            subtitle: 'Isi formulir di bawah ini untuk mendapatkan penawaran harga terbaik atau booking test drive kendaraan Mitsubishi pilihan Anda.',
            submitText: 'Kirim Permintaan',
            products: [
                { value: 'xpander', label: 'Mitsubishi Xpander' },
                { value: 'pajero-sport', label: 'Mitsubishi Pajero Sport' },
                { value: 'eclipse-cross', label: 'Mitsubishi Eclipse Cross' },
                { value: 'canter-fe71', label: 'Mitsubishi Canter FE 71' },
                { value: 'canter-fe84', label: 'Mitsubishi Canter FE 84' },
                { value: 'fuso-fn527', label: 'Mitsubishi Fuso FN 527' },
                { value: 'fuso-fm517', label: 'Mitsubishi Fuso FM 517' }
            ],
            ...options
        };
    }
    
    /**
     * Inisialisasi form
     */
    init() {
        this.createForm();
        this.addEventListeners();
    }
    
    /**
     * Membuat form
     */
    createForm() {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div class="lead-form-container">
                <div class="lead-form-title">
                    <h2>${this.options.title}</h2>
                    <p>${this.options.subtitle}</p>
                </div>
                
                <form id="lead-form" class="lead-form">
                    <div class="form-row">
                        <div class="form-group">
                            <input type="text" class="form-control" id="name" placeholder="Nama Lengkap *" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" class="form-control" id="phone" placeholder="Nomor Telepon/WhatsApp *" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <input type="email" class="form-control" id="email" placeholder="Email *" required>
                        </div>
                        <div class="form-group">
                            <select class="form-control" id="product-interest" required>
                                <option value="" disabled selected>Produk yang diminati *</option>
                                ${this.options.products.map(product => `
                                    <option value="${product.value}">${product.label}</option>
                                `).join('')}
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <textarea class="form-control form-textarea" id="message" placeholder="Pesan tambahan (opsional)"></textarea>
                    </div>
                    
                    <button type="submit" class="btn-primary form-submit">${this.options.submitText}</button>
                    
                    <p class="form-note">
                        Dengan mengirim formulir ini, Anda menyetujui <a href="#">kebijakan privasi</a> kami.
                    </p>
                </form>
            </div>
        `;
    }
    
    /**
     * Menambahkan event listeners
     */
    addEventListeners() {
        const form = document.getElementById('lead-form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }
    
    /**
     * Menangani submit form
     */
    handleSubmit() {
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            product: document.getElementById('product-interest').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        
        // Simpan ke localStorage (simulasi)
        this.saveLead(formData);
        
        // Tampilkan konfirmasi
        alert('Terima kasih! Permintaan Anda telah berhasil dikirim. Tim kami akan menghubungi Anda dalam waktu 1x24 jam.');
        
        // Reset form
        document.getElementById('lead-form').reset();
    }
    
    /**
     * Menyimpan lead (simulasi)
     */
    saveLead(formData) {
        const leads = JSON.parse(localStorage.getItem('mitsubishi_leads') || '[]');
        leads.push(formData);
        localStorage.setItem('mitsubishi_leads', JSON.stringify(leads));
        
        console.log('Lead saved:', formData);
    }
}