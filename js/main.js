// main.js - JavaScript sederhana untuk fungsi dasar

// Saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Tutup menu mobile saat klik link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }
    
    // 2. Sticky navbar saat scroll
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        });
    }
    
    // 3. Set tahun di footer
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // 4. Smooth scroll untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Hanya handle internal anchor links
            if (href !== '#' && href.startsWith('#') && !href.includes('.html')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    window.scrollTo({
                        top: targetElement.offsetTop - navbarHeight - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 5. Tab functionality untuk produk
    const tabButtons = document.querySelectorAll('[data-tab]');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Hapus active class dari semua button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Tambah active class ke button yang diklik
                this.classList.add('active');
                
                // Sembunyikan semua tab content
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Tampilkan tab content yang dipilih
                const activeTab = document.getElementById(tabId);
                if (activeTab) {
                    activeTab.classList.add('active');
                }
            });
        });
    }
    
    // 6. Form submission handler sederhana
    const leadForm = document.getElementById('leadForm');
    
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil data form
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simpan ke localStorage (untuk demo)
            const leads = JSON.parse(localStorage.getItem('mitsubishi_leads') || '[]');
            leads.push({
                ...data,
                date: new Date().toISOString()
            });
            localStorage.setItem('mitsubishi_leads', JSON.stringify(leads));
            
            // Tampilkan pesan sukses
            alert('Terima kasih! Permintaan Anda telah dikirim. Tim kami akan menghubungi Anda dalam waktu 1x24 jam.');
            
            // Reset form
            this.reset();
        });
    }
    
    // 7. Update active nav link berdasarkan halaman
    function updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            link.classList.remove('active');
            
            if (currentPage === linkPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    updateActiveNavLink();
});