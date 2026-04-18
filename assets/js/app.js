/**
 * Cavallini Assessoria - Global Application Scripts (v3.5)
 * Premium "Shutter" (Persiana) Page Transitions with GSAP & Barba.js.
 */

// === 1. Lógicas Específicas Compartilhadas ===
function initMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const close = document.getElementById("close-menu-btn");
    const overlay = document.getElementById("mobile-menu-overlay");

    if (!btn || !overlay) return;

    btn.onclick = (e) => {
        if (e) e.preventDefault();
        overlay.classList.add('menu-active');
        document.body.style.overflow = "hidden";
        
        const tl = gsap.timeline();
        tl.set(overlay, { display: 'flex', yPercent: -100, autoAlpha: 0 })
          .to(overlay, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power4.out" })
          .to(overlay.querySelectorAll(".mobile-link"), {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out"
          }, "-=0.2");
    };

    if (close) {
        close.onclick = (e) => {
            if (e) e.preventDefault();
            overlay.classList.remove('menu-active');
            document.body.style.overflow = "";
            gsap.to(overlay, { yPercent: -100, autoAlpha: 0, duration: 0.5, ease: "power4.in", onComplete: () => {
                gsap.set(overlay, { display: 'none' });
                gsap.set(overlay.querySelectorAll(".mobile-link"), { opacity: 0, y: 8 });
            }});
        };
    }

    overlay.querySelectorAll(".mobile-link").forEach(l => {
        l.onclick = () => {
            const href = l.getAttribute('href');
            // Fecha o menu para todos os links (incluindo links para index.html#secao)
            overlay.classList.remove('menu-active');
            document.body.style.overflow = "";
            gsap.to(overlay, { autoAlpha: 0, duration: 0.3, onComplete: () => {
                gsap.set(overlay, { display: 'none', yPercent: -100 });
                gsap.set(overlay.querySelectorAll(".mobile-link"), { opacity: 0, y: 8 });
            }});
        };
    });
}

function initHeroCarousel(container) {
    const layers = container.querySelectorAll('.bg-layer');
    if (!layers.length) return;

    gsap.killTweensOf(layers);
    gsap.set(layers, { autoAlpha: 0, scale: 1.15 });
    gsap.set(layers[0], { autoAlpha: 1, scale: 1, immediateRender: true });

    let current = 0;
    const interval = setInterval(() => {
        const next = (current + 1) % layers.length;
        const tl = gsap.timeline();
        tl.to(layers[current], { autoAlpha: 0, scale: 1.15, duration: 2.5, ease: "power2.inOut" });
        tl.fromTo(layers[next], 
            { autoAlpha: 0, scale: 1.15 },
            { autoAlpha: 1, scale: 1, duration: 2.5, ease: "power2.inOut" }, "-=2.5");
        current = next;
    }, 7000);

    container._heroInterval = interval;
}

function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('reveal-on-scroll-h2')) {
                    entry.target.classList.add('reveal-active');
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll, .reveal-logo, .reveal-item, h2, h3').forEach(el => observer.observe(el));
}

function initContactForm() {
    const contactForm = document.getElementById("premium-contact-form");
    if (!contactForm) return;
    contactForm.onsubmit = (e) => {
        e.preventDefault();
        const toaster = document.getElementById("premium-toaster");
        if (toaster) {
            toaster.classList.remove("-translate-y-[200%]", "opacity-0");
            setTimeout(() => toaster.classList.add("-translate-y-[200%]", "opacity-0"), 4000);
        }
        contactForm.reset();
    };
}

function reinitGlobalComponents(container) {
    initMobileMenu();
    initScrollObserver();
    handleHashNavigation();
    
    // Auto-close menu on transition
    const mobileOverlay = document.getElementById("mobile-menu-overlay");
    if (mobileOverlay && mobileOverlay.classList.contains('menu-active')) {
        gsap.set(mobileOverlay, { autoAlpha: 0, yPercent: -100, display: 'none' });
        mobileOverlay.classList.remove('menu-active');
        document.body.style.overflow = "";
    }

    const ns = container.getAttribute('data-barba-namespace');
    if (ns === 'home') {
        initContactForm();
        initHeroCarousel(container);
        gsap.fromTo(container.querySelectorAll(".hero-reveal"), 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.2 }
        );
    } else if (ns === 'faq') {
        // Animar hero-reveal na página FAQ
        gsap.fromTo(container.querySelectorAll(".hero-reveal"), 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.2 }
        );
        
        container.querySelectorAll('.accordion-header').forEach(h => {
            h.onclick = () => {
                const item = h.parentElement;
                const isOpen = item.classList.contains('active');
                container.querySelectorAll('.accordion-item').forEach(acc => {
                    acc.classList.remove('active');
                    const c = acc.querySelector('.accordion-content');
                    if (c) c.style.maxHeight = null;
                });
                if (!isOpen) {
                    item.classList.add('active');
                    const content = item.querySelector('.accordion-content');
                    if (content) content.style.maxHeight = content.scrollHeight + "px";
                }
            };
        });
    } else {
        const inner = container.querySelector(".reveal-inner");
        if (inner) gsap.fromTo(inner, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 });
    }
}

// === 3. Barba.js System (Shutter Transition) ===
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

let isTransitioning = false;

// Funções de Animação baseadas no modelo Persiana
function fecharPersiana() {
    const tl = gsap.timeline();
    tl.to(".block.left", { x: "0%", duration: 0.8, ease: "power2.inOut" }, 0)
      .to(".block.right", { x: "0%", duration: 0.8, ease: "power2.inOut" }, 0)
      .to(".transition-logo", { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, "-=0.2");
    return tl;
}

function abrirPersiana() {
    const tl = gsap.timeline();
    tl.to(".transition-logo", { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in" })
      .to(".block.left", { x: "-100%", duration: 0.8, ease: "power2.inOut" }, "-=0.1")
      .to(".block.right", { x: "100%", duration: 0.8, ease: "power2.inOut" }, "-=0.8");
    return tl;
}

barba.init({
    sync: true,
    timeout: 7000,
    prevent: ({ el }) => {
        // Estratégia inteligente para links com hash
        if (el.classList && el.classList.contains('no-barba')) return true;
        
        if (el.href && el.href.includes('#')) {
            const [page, hash] = el.href.split('#');
            const currentPath = window.location.pathname.split('/').pop();
            
            // Se for link interno da mesma página com hash, ignora Barba
            if (!page || page === currentPath || page === '') {
                return true; // Barba não intercepta
            }
            
            // Se for para outra página com hash, deixa Barba tratar mas adiciona dados
            el.dataset.hash = hash;
        }
        return false;
    },
    transitions: [{
        name: 'shutter-transition',
        
        async leave(data) {
            if (isTransitioning) return false;
            isTransitioning = true;
            
            // Pausa animações pendentes
            if (data.current.container._heroInterval) clearInterval(data.current.container._heroInterval);

            // Se o menu mobile estiver aberto, fecha suavemente antes/durante
            const mobileOverlay = document.getElementById("mobile-menu-overlay");
            if (mobileOverlay && mobileOverlay.classList.contains('menu-active')) {
                gsap.to(mobileOverlay, { autoAlpha: 0, duration: 0.3 });
            }

            // Preparar página nova
            gsap.set(data.next.container, { opacity: 0 });

            // Fade out página atual
            await gsap.to(data.current.container, { opacity: 0, duration: 0.3 });
        },

        async enter(data) {
            // Gerenciamento de Scroll
            const hash = data.next.url.hash;
            let scrollTarget = 0;
            if (hash) {
                // Remove o # e procura pelo elemento
                const hashId = hash.replace('#', '');
                const targetEl = data.next.container.querySelector(`#${hashId}`);
                if (targetEl) scrollTarget = targetEl.offsetTop - 80;
            }
            window.scrollTo(0, scrollTarget);

            // Fade in página nova (SIMPLES E DIRETO)
            await gsap.to(data.next.container, { 
                opacity: 1, 
                duration: 0.4,
                clearProps: "transform"
            });
            
            isTransitioning = false;
        },

        afterEnter(data) {
            reinitGlobalComponents(data.next.container);
        }
    }]
});

// Função para navegação com hash - Versão simplificada e robusta
function handleHashNavigation() {
    // Remove todos os listeners existentes primeiro
    document.querySelectorAll('a[href*="#"]').forEach(link => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
    });
    
    // Adiciona listeners nos novos links
    document.querySelectorAll('a[href*="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (!href.includes('#')) return;
            
            const [page, hash] = href.split('#');
            const currentPath = window.location.pathname.split('/').pop();
            
            // Se for link interno da mesma página
            if (!page || page === currentPath || page === '') {
                e.preventDefault();
                e.stopPropagation();
                
                // Força scroll imediato
                const targetElement = document.getElementById(hash);
                if (targetElement) {
                    const offset = targetElement.offsetTop - 80;
                    window.scrollTo(0, offset);
                }
            }
        });
    });
}

// Initial Init
document.addEventListener("DOMContentLoaded", () => {
    reinitGlobalComponents(document.querySelector('[data-barba="container"]'));
    handleHashNavigation();
    // State inicial
    gsap.set(".block.left", { x: "-100%" });
    gsap.set(".block.right", { x: "100%" });
});
