export class Slider {
  constructor() {
    this.currentSlide = 0;
    this.slides = [
      {
        image: 'imgs/fotos/gui-noseslide.jpg',
        caption: 'Wesley "Gnomo"',
      },
      {
        image: 'imgs/fotos/camuflado.png',
        caption: 'Shapes Maple',
      },
      {
        image: '/imgs/fotos/latino-rock.jpg',
        caption: 'Daniel "Latino"',
      },
      {
        image: '/imgs/fotos/graffity-colors.png',
        caption: 'Shapes Maple',
      },
      {
        image: '/imgs/fotos/robson-smith.jpg',
        caption: 'Robson',
      },
      {
        image: '/imgs/fotos/graffiti-muro.png',
        caption: 'Shapes Maple',
      },
      {
        image: '/imgs/fotos/vitor.jpg',
        caption: 'Vitor',
      },
      {
        image: '/imgs/fotos/visagem.jpg',
        caption: 'Visagem',
      },
      {
        image: '/imgs/fotos/nino.jpg',
        caption: 'Nino "cara de gato"',
      },
      {
        image: '/imgs/fotos/gui.jpg',
        caption: 'wesley "Gnomo"',
      },
      {
        image: '/imgs/produtos/bone/BONEBLACKRED.jpg',
        caption: 'Bonés personalizados',
      },
    ];

    this.initializeSlider();
    this.startAutoSlide();
    this.handleResize();
  }

  handleResize() {
    const updateSlideWidth = () => {
      const width = window.innerWidth;
      if (width <= 767) {
        this.slidesPerView = 1;
      } else if (width <= 1024) {
        this.slidesPerView = 2;
      } else {
        this.slidesPerView = 3;
      }
      this.updateSlider(true);
    };

    window.addEventListener('resize', updateSlideWidth);
    updateSlideWidth();
  }

  initializeSlider() {
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'slider-container';

    const slider = document.createElement('div');
    slider.className = 'slider';

    const allSlides = [...this.slides, ...this.slides, ...this.slides];
    allSlides.forEach((slide, index) => {
      const slideDiv = document.createElement('div');
      slideDiv.className = 'slide';
      slideDiv.innerHTML = `
                <img src="${slide.image}" alt="Slide ${index + 1}">
                <div class="slide-caption">${slide.caption}</div>
            `;
      slider.appendChild(slideDiv);
    });

    const prevButton = document.createElement('button');
    prevButton.className = 'slider-button prev-button';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.addEventListener('click', () => this.prevSlide());

    const nextButton = document.createElement('button');
    nextButton.className = 'slider-button next-button';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.addEventListener('click', () => this.nextSlide());

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';

    this.slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'dot' + (index === 0 ? ' active' : '');
      dot.addEventListener('click', () => this.goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(prevButton);
    sliderContainer.appendChild(nextButton);
    sliderContainer.appendChild(dotsContainer);

    const header = document.querySelector('header');
    header.parentNode.insertBefore(sliderContainer, header.nextSibling);

    this.sliderElement = slider;
    this.dots = dotsContainer.getElementsByClassName('dot');

    this.currentSlide = this.slides.length;
    this.updateSlider(true);
  }

  updateSlider(immediate = false) {
    const slideWidth = 100 / this.slidesPerView;
    const translation = -(this.currentSlide * slideWidth);

    if (immediate) {
      this.sliderElement.style.transition = 'none';
    } else {
      this.sliderElement.style.transition = 'transform 0.5s ease-in-out';
    }

    this.sliderElement.style.transform = `translateX(${translation}%)`;

    if (!immediate) {
      if (this.currentSlide >= this.slides.length * 2) {
        setTimeout(() => {
          this.currentSlide = this.slides.length;
          this.updateSlider(true);
        }, 500);
      } else if (this.currentSlide < this.slides.length) {
        setTimeout(() => {
          this.currentSlide = this.slides.length;
          this.updateSlider(true);
        }, 500);
      }
    }

    const activeDotIndex = this.currentSlide % this.slides.length;
    Array.from(this.dots).forEach((dot, index) => {
      dot.classList.toggle('active', index === activeDotIndex);
    });
  }

  nextSlide() {
    this.currentSlide++;
    this.updateSlider();
  }

  prevSlide() {
    this.currentSlide--;
    this.updateSlider();
  }

  goToSlide(index) {
    this.currentSlide = this.slides.length + index;
    this.updateSlider();
  }

  startAutoSlide() {
    setInterval(() => this.nextSlide(), 3000);
  }
}
