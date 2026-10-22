import { Component, input } from '@angular/core';
import { SkillGroupModel } from '../models/skill-group.model';

@Component({
  selector: 'app-skill-group',
  templateUrl: './skill-group.html',
  styleUrl: './skill-group.css',
})
export class SkillGroup {
  readonly skillGroup = input.required<SkillGroupModel>();
}
