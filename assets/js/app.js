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

    // Função encapsulada para fechar o menu com segurança
    const closeMenu = (immediate = false) => {
        if (!overlay.classList.contains('menu-active')) return;

        overlay.classList.remove('menu-active');
        document.body.style.overflow = "";

        const links = overlay.querySelectorAll(".mobile-link");
        gsap.killTweensOf(overlay);
        gsap.killTweensOf(links);

        if (immediate) {
            gsap.set(overlay, { display: 'none', autoAlpha: 0, yPercent: -100 });
            gsap.set(links, { opacity: 0, y: 8 });
            overlay.style.pointerEvents = 'none';
        } else {
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(overlay, { display: 'none' });
                    overlay.style.pointerEvents = 'none';
                }
            });
            tl.to(links, { opacity: 0, y: -10, duration: 0.2, stagger: 0.05, ease: "power2.in" })
                .to(overlay, { yPercent: -100, autoAlpha: 0, duration: 0.4, ease: "power4.in" }, "-=0.1");
        }
    };

    // Função encapsulada para abrir o menu
    const openMenu = () => {
        if (overlay.classList.contains('menu-active')) return;

        overlay.classList.add('menu-active');
        document.body.style.overflow = "hidden";
        overlay.style.pointerEvents = 'auto'; // Reativa cliques

        const links = overlay.querySelectorAll(".mobile-link");
        links.forEach(l => l.style.pointerEvents = 'auto');

        gsap.killTweensOf(overlay);
        gsap.killTweensOf(links);

        const tl = gsap.timeline();
        tl.set(overlay, { display: 'flex', autoAlpha: 0, yPercent: -100 })
            .set(links, { opacity: 0, y: 20 })
            .to(overlay, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power4.out" })
            .to(links, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "-=0.2");
    };

    // Previne duplicação usando onclick ao invés de addEventListener
    btn.onclick = (e) => {
        e.preventDefault();
        openMenu();
    };

    if (close) {
        close.onclick = (e) => {
            e.preventDefault();
            closeMenu();
        };
    }

    // Correção dos links do menu mobile
    overlay.querySelectorAll(".mobile-link").forEach(link => {
        link.onclick = (e) => {
            const href = link.getAttribute('href');
            const isHash = href.includes('#');

            // Se for link âncora para a MESMA página
            if (isHash) {
                const [page, hash] = href.split('#');
                const currentPath = window.location.pathname.split('/').pop();

                if (!page || page === currentPath || page === '') {
                    e.preventDefault();
                    closeMenu(false); // Anima fechamento

                    setTimeout(() => {
                        const targetElement = document.getElementById(hash);
                        if (targetElement) {
                            const offset = targetElement.offsetTop - 80;
                            window.scrollTo({ top: offset, behavior: 'smooth' });
                        }
                    }, 400); // Aguarda a animação de saída do menu
                    return;
                }
            }

            // Para outras páginas, deixamos o Barba interceptar normalmente e não prevenimos o default.
            // Fechamento imediato do menu para não poluir a transição de saída e a nova página.
            closeMenu(true);
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

        // Reanimar navbar ao voltar para home
        const header = document.getElementById("main-header");
        if (header) {
            gsap.fromTo(header,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
            );
        }

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
                    if (c) {
                        c.style.maxHeight = null;
                        c.classList.remove('expanded'); // REMOVE CLASSE EXPANDED
                    }
                });
                if (!isOpen) {
                    item.classList.add('active');
                    const content = item.querySelector('.accordion-content');
                    if (content) {
                        content.style.maxHeight = content.scrollHeight + "px";
                        content.classList.add('expanded'); // ADICIONA CLASSE EXPANDED
                    }
                }
            };
        });
    } else if (ns === 'avcb' || ns === 'consultoria' || ns === 'projetos') {
        // Animar imagem de fundo com fade in elegante
        const bgImage = container.querySelector(".bg-cover");
        if (bgImage) {
            gsap.fromTo(bgImage,
                { opacity: 0, scale: 1.1 },
                { opacity: 1, scale: 1, duration: 1.8, ease: "power3.out", delay: 0.4 }
            );
        }

        // Animar conteúdo com fade in suave e stagger
        const content = container.querySelector(".projetos-content, .consultoria-content, .avcb-content");
        if (content) {
            gsap.fromTo(content.children,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.6 }
            );
        }

        // Animar elementos específicos
        const elements = container.querySelectorAll("h1, h2, h3, p, li, a:not(.no-barba)");
        gsap.fromTo(elements,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.8 }
        );
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
    tl.to(".shutter-block.left", { x: "0%", duration: 0.8, ease: "power2.inOut" }, 0)
        .to(".shutter-block.right", { x: "0%", duration: 0.8, ease: "power2.inOut" }, 0)
        .to(".transition-logo", { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, "-=0.2");
    return tl;
}

function abrirPersiana() {
    const tl = gsap.timeline();
    tl.to(".transition-logo", { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in" })
        .to(".shutter-block.left", { x: "-100%", duration: 0.8, ease: "power2.inOut" }, "-=0.1")
        .to(".shutter-block.right", { x: "100%", duration: 0.8, ease: "power2.inOut" }, "-=0.8");
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
    // Adiciona listeners nos links de âncora de forma idempotente
    document.querySelectorAll('a[href*="#"]').forEach(link => {
        // Ignora os links do menu mobile e links isolados sem Barba,
        // pois a initMobileMenu já faz o gerenciamento de estados para o overlay.
        if (link.classList.contains('mobile-link') || link.closest('#mobile-menu-overlay')) {
            return;
        }

        // Utiliza atributo data para evitar duplicação em cada transição do Barba
        if (link.dataset.hashListener) return;
        link.dataset.hashListener = "true";

        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href.includes('#')) return;

            const [page, hash] = href.split('#');
            const currentPath = window.location.pathname.split('/').pop();

            // Se for link interno exclusivo da mesma página
            if (!page || page === currentPath || page === '') {
                e.preventDefault();
                e.stopPropagation();

                const targetElement = document.getElementById(hash);
                if (targetElement) {
                    const offset = targetElement.offsetTop - 80;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
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
