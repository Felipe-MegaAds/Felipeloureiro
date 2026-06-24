/**
 * ==========================================================================
 * LÓGICA DE INTERATIVIDADE DA LANDING PAGE - DR. FELIPE LOUREIRO
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // CONTROLE DE ROLAGEM DO HEADER FIXO
    // ==========================================
    // Seleciona o elemento do cabeçalho
    const header = document.querySelector('.main-header');
    
    // Função para alterar estilo do header com base na rolagem da página
    const checkScroll = () => {
        // Se rolou mais de 50 pixels, adiciona a classe 'scrolled', caso contrário remove
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Executa a checagem no carregamento inicial e a cada rolagem da tela
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // ==========================================
    // MENU DE NAVEGAÇÃO MOBILE (HAMBURGUER)
    // ==========================================
    // Seleciona os elementos do hambúrguer e do menu de links
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Alterna o estado do menu (aberto/fechado) ao clicar no botão
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha o menu mobile automaticamente ao clicar em qualquer link de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ==========================================
    // NAVEGAÇÃO COM MARCAÇÃO DE LINK ATIVO (SCROLLSPY)
    // ==========================================
    // Seleciona todas as seções e os links correspondentes
    const sections = document.querySelectorAll('section');
    
    const highlightMenu = () => {
        let scrollPos = window.scrollY + 150; // Adiciona offset para compensar o header fixo

        sections.forEach(section => {
            // Verifica se a seção está visível na tela no momento
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                const currentId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    // Remove classe ativa de todos os links e adiciona apenas no link da seção atual
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightMenu);

    // ==========================================
    // ANIMAÇÃO DE ENTRADA AO ROLAR (REVEAL ON SCROLL)
    // ==========================================
    // Utiliza a API IntersectionObserver para disparar animações de fade-in
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento estiver visível na janela do usuário (pelo menos 15%)
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Deixa de observar o elemento após a animação ser ativada (executa apenas uma vez)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Porcentagem do elemento visível necessária para disparar
        rootMargin: '0px 0px -50px 0px' // Margem inferior sutil para melhor experiência
    });

    // Ativa a observação para cada elemento configurado com a classe 'reveal'
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================
    // MINI BALÃO WHATSAPP (EXIBIÇÃO AUTOMÁTICA)
    // ==========================================
    // Como detalhe de luxo, exibe o balão do WhatsApp automaticamente após alguns segundos,
    // chamando a atenção do cliente e ocultando-o posteriormente caso não haja interação.
    const whatsappTooltip = document.getElementById('whatsappTooltip');
    const whatsappFloating = document.getElementById('whatsappFloating');

    // Mostra o mini-balão após 3 segundos do carregamento da página
    setTimeout(() => {
        // Verifica se a tela é desktop (largura maior que 768px), pois no mobile o tooltip está oculto via CSS
        if (window.innerWidth > 768) {
            whatsappTooltip.style.opacity = '1';
            whatsappTooltip.style.visibility = 'visible';
            whatsappTooltip.style.transform = 'translateY(0)';
            
            // Oculta o balão após 7 segundos adicionais (dando tempo para leitura)
            setTimeout(() => {
                // Remove os estilos forçados por JS para que o hover no CSS volte a controlar o balão normalmente
                whatsappTooltip.removeAttribute('style');
            }, 7000);
        }
    }, 3000);

    // Remove as propriedades inline do JS imediatamente se o usuário passar o mouse no botão flutuante,
    // garantindo que a interatividade manual do hover do CSS prevaleça.
    whatsappFloating.addEventListener('mouseenter', () => {
        whatsappTooltip.removeAttribute('style');
    });

});
