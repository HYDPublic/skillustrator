import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

import { Skill } from '../../models/skill';
import { SkillsService } from '../../services/skills.service';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-add-person-skill',
  templateUrl: './add-person-skill.component.html',
  styleUrls: ['./add-person-skill.component.css']
})
export class AddPersonSkillComponent implements OnInit {
  modalActions = new EventEmitter<string | MaterializeAction>();
  availableSkills: Skill[];
  selectedSkill: Skill;
  @Input() person: Person;
  hasError: boolean;
  errors: string[];

  constructor(private skillsService: SkillsService, private personService: PersonService) { }

  ngOnInit() {
    this.skillsService.getAll().subscribe(skills => this.availableSkills = skills);
  }

  openModal(): void {
    this.hideError();
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  closeModal(): void {
    this.hideError();
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  addSkill(): void {
    this.hasError = false;
    if (this.selectedSkill && this.selectedSkill.id) {
      this.personService.addPersonSkill(this.person.id, this.selectedSkill.id).subscribe(person => this.person = person);
      this.closeModal();
    } else {
      this.showError();
    }
  }

  showError(): void {
    this.errors = ['No skill was selected.'];
    this.hasError = true;
  }

  hideError(): void {
    this.errors = [];
    this.hasError = false;
  }
}
