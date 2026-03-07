import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-heart-animation',
  standalone: true,
  templateUrl: './heart-animation.component.html',
  styleUrl: './heart-animation.component.css'
})
export class HeartAnimationComponent implements AfterViewInit {
  @ViewChild('heartCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private points: { x: number; y: number; z: number }[] = [];
  private readonly text = "I LOVE YOU";
  
  public animState = { rotation: 0 };

  ngAfterViewInit() {
    this.initCanvas();
    this.create3DHeart();
    this.startAnimation();
  }

  private initCanvas() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d', { alpha: false })!;
    this.resizeCanvas();
  }

  @HostListener('window:resize')
  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private create3DHeart() {
    this.points = [];
    const layers = 5; // Creating multiple layers to give it "thickness"
    const pointsPerLayer = 30;

    for (let j = 0; j < layers; j++) {
      // Z-depth creates the "fullness" so it isn't flat
      const z = (j - (layers - 1) / 2) * 4; 

      for (let i = 0; i < pointsPerLayer; i++) {
        const t = (i / pointsPerLayer) * Math.PI * 2;
        
        // Heart Formula
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        
        this.points.push({ x, y, z });
      }
    }
  }

  private startAnimation() {
    gsap.to(this.animState, {
      rotation: Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: "none",
      onUpdate: () => this.draw()
    });
  }

  private draw() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = Math.min(canvas.width, canvas.height) / 55;

    // Sort points by Z-depth so the ones "behind" are drawn first (Painters Algorithm)
    const sortedPoints = [...this.points].sort((a, b) => {
      const zA = a.z * Math.cos(this.animState.rotation) - a.x * Math.sin(this.animState.rotation);
      const zB = b.z * Math.cos(this.animState.rotation) - b.x * Math.sin(this.animState.rotation);
      return zA - zB;
    });

    sortedPoints.forEach((p) => {
      // Rotate around Y axis
      const cos = Math.cos(this.animState.rotation);
      const sin = Math.sin(this.animState.rotation);
      
      const xRot = p.x * cos - p.z * sin;
      const zRot = p.x * sin + p.z * cos;

      // Perspective projection
      const perspective = 600 / (600 + zRot * scale);
      const finalX = centerX + xRot * scale * perspective;
      const finalY = centerY + p.y * scale * perspective;
      const alpha = Math.max(0.2, (zRot + 20) / 40);
      
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = "#FF0033";
      this.ctx.font = `bold ${Math.floor(scale * 0.7 * perspective)}px sans-serif`;
      this.ctx.textAlign = 'center';
      this.ctx.fillText(this.text, finalX, finalY);
    });
  }
}