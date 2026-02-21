import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-flower',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flower.component.html',
  styleUrls: ['./flower.component.css']
})
export class FlowerComponent implements AfterViewInit {
  isVisualizing = true;
  fireflyCount = new Array(15); // Increased count for better atmosphere

  ngAfterViewInit() {
    this.randomizeFireflies();
  }

  randomizeFireflies() {
    setTimeout(() => {
      const flies = document.querySelectorAll('.firefly');
      flies.forEach((f: any) => {
        f.style.left = Math.random() * 100 + 'vw';
        f.style.top = Math.random() * 100 + 'vh';
        f.style.animationDelay = Math.random() * 5 + 's';
        f.style.animationDuration = 5 + Math.random() * 5 + 's';
      });
    }, 0);
  }

  regrow() {
    this.isVisualizing = false;
    setTimeout(() => {
      this.isVisualizing = true;
      // Re-randomize after the DOM updates
      this.randomizeFireflies();
    }, 100);
  }
}