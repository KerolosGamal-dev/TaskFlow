import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent {
  @Input() task: any;
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
}