import { Component, signal, computed, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { GalleriaModule } from 'primeng/galleria';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Photo {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  title: string;
  alt: string;
  category: string;
}

@Component({
  selector: 'app-porfolio',
  standalone: true,
  imports: [CommonModule, FormsModule, GalleriaModule],
  templateUrl: './porfolio.component.html',
  styleUrls: ['./porfolio.component.css'],
})
export class PorfolioComponent implements AfterViewInit, OnDestroy {

  public selectedCategory = signal<string>('All');
  public isFormOpen = signal<boolean>(false);

  public formData = signal({ name: '', email: '', message: '' });

  public categories: string[] = ['All', 'Bagan', 'Nature', 'Animals', 'Flowers'];

   public photos = signal<Photo[]>([
    {
      itemImageSrc:
        'https://b-cdn.springnest.com/media/img/td/baganf0c343c.jpg?crop=2048%2C1136%2C0%2C178&width=620',

      thumbnailImageSrc:
        'https://b-cdn.springnest.com/media/img/td/baganf0c343c.jpg?crop=2048%2C1136%2C0%2C178&width=620',

      title: 'Ancient Temples',

      alt: 'Bagan Architecture',

      category: 'Bagan',
    },

    {
      itemImageSrc:
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/70/0c/a9/caption.jpg?w=500&h=400&s=1',

      thumbnailImageSrc:
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/70/0c/a9/caption.jpg?w=500&h=400&s=1',

      title: 'Ancient Temples',

      alt: 'Bagan Architecture',

      category: 'Bagan',
    },

    {
      itemImageSrc:
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/09/a2/38/f2.jpg',

      thumbnailImageSrc:
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/09/a2/38/f2.jpg',

      title: 'Ancient Temples',

      alt: 'Bagan Architecture',

      category: 'Bagan',
    },

    {
      itemImageSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYqz8B0b5nK8fKnVJ6vbCmRNgJ2u_jjRPUAQ&s',

      thumbnailImageSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYqz8B0b5nK8fKnVJ6vbCmRNgJ2u_jjRPUAQ&s',

      title: 'Ancient Temples',

      alt: 'Bagan Architecture',

      category: 'Bagan',
    },

    {
      itemImageSrc:
        'https://www.passportandpixels.com/wp-content/uploads/2016/08/Bagan_0565_pp.jpg',

      thumbnailImageSrc:
        'https://www.passportandpixels.com/wp-content/uploads/2016/08/Bagan_0565_pp.jpg',

      title: 'Ancient Temples',

      alt: 'Bagan Architecture',

      category: 'Bagan',
    },

    {
      itemImageSrc:
        'https://i.pinimg.com/originals/85/12/f6/8512f68ab5814bb6fdd8a6f2b55064c8.jpg',

      thumbnailImageSrc:
        'https://i.pinimg.com/originals/85/12/f6/8512f68ab5814bb6fdd8a6f2b55064c8.jpg',

      title: 'Alpine Nature',

      alt: 'Mountain Scenery',

      category: 'Nature',
    },

    {
      itemImageSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWxA6cwz_vwJgZ_f2YDXhNOoUDCt9ojHDBnQ&s',

      thumbnailImageSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWxA6cwz_vwJgZ_f2YDXhNOoUDCt9ojHDBnQ&s',

      title: 'Alpine Nature',

      alt: 'Mountain Scenery',

      category: 'Nature',
    },

    {
      itemImageSrc: 'https://s3.amazonaws.com/YouGarden/Web/500x500/401535.jpg',

      thumbnailImageSrc:
        'https://s3.amazonaws.com/YouGarden/Web/500x500/401535.jpg',

      title: 'Sacred Lotus',

      alt: 'Lotus Flower Macro',

      category: 'Flowers',
    },

    {
      itemImageSrc:
        'https://hips.hearstapps.com/hmg-prod/images/water-lilies-lake-france-royalty-free-image-1699382596.jpg?crop=0.662xw:1.00xh;0.170xw,0&resize=1200:*',

      thumbnailImageSrc:
        'https://hips.hearstapps.com/hmg-prod/images/water-lilies-lake-france-royalty-free-image-1699382596.jpg?crop=0.662xw:1.00xh;0.170xw,0&resize=1200:*',

      title: 'Wildlife Portrait',

      alt: 'Panda in Nature',

      category: 'Flowers',
    },

    {
      itemImageSrc:
        'https://bouqs.com/blog/wp-content/uploads/2018/08/shutterstock_1662182848-min.jpg',

      thumbnailImageSrc:
        'https://bouqs.com/blog/wp-content/uploads/2018/08/shutterstock_1662182848-min.jpg',

      title: 'Wildlife Portrait',

      alt: 'Panda in Nature',

      category: 'Flowers',
    },

    {
      itemImageSrc:
        'https://cdn-gonef.nitrocdn.com/UbWAxHlpDDRAfYTBoCBfYvGZgzkfyWTb/assets/images/optimized/rev-d7b6478/seethewild.org/wp-content/uploads/2022/08/1-1-300x276-1.jpeg',

      thumbnailImageSrc:
        'https://cdn-gonef.nitrocdn.com/UbWAxHlpDDRAfYTBoCBfYvGZgzkfyWTb/assets/images/optimized/rev-d7b6478/seethewild.org/wp-content/uploads/2022/08/1-1-300x276-1.jpeg',

      title: 'Wildlife Portrait',

      alt: 'Panda in Nature',

      category: 'Animals',
    },

    {
      itemImageSrc:
        'https://explore-live.s3.eu-west-1.amazonaws.com/medialibraries/explore/blog-images/2018%2012%20december/shutterstock_1080525158-2.jpg?ext=.jpg&width=620&format=webp&quality=80&v=202103231018',

      thumbnailImageSrc:
        'https://explore-live.s3.eu-west-1.amazonaws.com/medialibraries/explore/blog-images/2018%2012%20december/shutterstock_1080525158-2.jpg?ext=.jpg&width=620&format=webp&quality=80&v=202103231018',

      title: 'Wildlife Portrait',

      alt: 'Panda in Nature',

      category: 'Animals',
    },
  ]);

  public filteredPhotos = computed(() => {
    const category = this.selectedCategory();
    if (category === 'All') return this.photos();
    return this.photos().filter((p) => p.category === category);
  });

  ngAfterViewInit() {
    this.initPremiumAnimations();
  }

  ngOnDestroy() {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  public setFilter(category: string) {
    this.selectedCategory.set(category);
    setTimeout(() => ScrollTrigger.refresh(), 150);
    document.getElementById('work-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  public toggleContactForm() {
    this.isFormOpen.update((v) => !v);
  }

  public sendEmail(formValues: any) {
    const subject = `Inquiry from ${formValues.name}`;
    const body = `Message: ${formValues.message}%0D%0AFrom: ${formValues.email}`;
    window.location.href = `mailto:adam@example.com?subject=${subject}&body=${body}`;
    this.isFormOpen.set(false);
  }

  private initPremiumAnimations() {

    // Hero Text Reveal
    gsap.from('.reveal-text', { opacity: 0, y: 80, duration: 1.6, stagger: 0.25, ease: 'power4.out' });

    // Hero Image Wiggle + Scale
    gsap.fromTo('.hero-img', { scale: 0.9, rotation: -2, opacity: 0 }, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1.8,
      delay: 0.3,
      ease: 'elastic.out(1, 0.5)',
    });

    // Sidebar Card
    gsap.from('.sidebar-card', { x: 120, opacity: 0, scale: 0.9, rotation: -3, duration: 1.8, delay: 0.5, ease: 'expo.out' });

    // Works Cards
    gsap.from('.photo-card', {
      scrollTrigger: { trigger: '.photo-grid', start: 'top 85%' },
      opacity: 0, y: 120, scale: 0.92, duration: 1.5, stagger: 0.2, ease: 'power3.out'
    });

    // Parallax Images
    gsap.utils.toArray('.parallax-img').forEach((img: any) => {
      gsap.to(img, { yPercent: -18, ease: 'none', scrollTrigger: { trigger: img, scrub: 1.5 } });
    });

    // Review Cards
    gsap.from('.review-card', {
      scrollTrigger: { trigger: '.review-card', start: 'top 90%' },
      opacity: 0, y: 80, scale: 0.95, duration: 1.3, stagger: 0.2, ease: 'power3.out'
    });

    // Services Cards
    gsap.from('.service-card', {
      scrollTrigger: { trigger: '.service-card', start: 'top 90%' },
      opacity: 0, y: 80, scale: 0.95, duration: 1.3, stagger: 0.2, ease: 'power3.out'
    });

    // Footer Reveal
    gsap.from('.footer-reveal', {
      scrollTrigger: { trigger: 'footer', start: 'top 85%' },
      opacity: 0, y: 80, duration: 1.3, ease: 'power4.out'
    });
  }
}
