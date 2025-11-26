export const smoothScrollTo = (elementId: string) => {
  const element = document.querySelector(elementId);
  if (!element) return;

  // Força scroll-behavior em todos os elementos
  document.documentElement.style.scrollBehavior = 'smooth';
  document.body.style.scrollBehavior = 'smooth';
  
  // Obtém a posição do elemento
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset;

  // Usa window.scrollTo com behavior smooth
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });

  // Atualiza a URL sem recarregar
  window.history.pushState(null, '', elementId);
};
