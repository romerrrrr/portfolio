class TextAnimator {
  constructor(container, phrases, options = {}) {
    this.container = container;
    this.phrases = phrases;
    this.currentIndex = 0;
    this.options = {
      displayTime: options.displayTime || 3000,
      transitionTime: options.transitionTime || 800,
    };
    this.init();
  }

  init() {
    this.element = document.createElement('div');
    this.element.className = 'animated-text';
    this.container.appendChild(this.element);
    this.animate();
  }

  async animate() {
    while (true) {
      const phrase = this.phrases[this.currentIndex];

      // Display new phrase
      this.element.textContent = phrase;
      this.element.classList.add('fade-up');

      // Wait for display duration
      await this.wait(this.options.displayTime);

      // Fade out
      this.element.classList.remove('fade-up');
      this.element.classList.add('fade-out');

      // Wait for transition
      await this.wait(this.options.transitionTime);

      // Reset for next phrase
      this.element.classList.remove('fade-out');

      // Move to next phrase
      this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
    }
  }

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Initialize animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.text-animation-container');
  const phrases = [
    'Game Developer',
    'Programming Enthusiast',
    'An upcoming Software Developer',
    'Web Developer'
  ];

  new TextAnimator(container, phrases, {
    displayTime: 3000,
    transitionTime: 800,
  });
});
