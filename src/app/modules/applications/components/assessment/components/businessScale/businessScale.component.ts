import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';

import { BUSINESSSKILLS } from '../../../../../../model/businessSkill';

import {
  DataService,
} from '../../../../../../services';

@Component({
  selector: 'app-businessScale',
  templateUrl: './businessScale.component.html',
  styleUrls: ['./businessScale.component.scss']
})
export class BusinessScaleComponent implements OnInit, OnDestroy {

  businessform: FormGroup;
  skills=BUSINESSSKILLS;
  scaleValue = 0;
  submitted = false;
  private subscription = new Subscription();
  autoTicks = false;
  invert = false;
  max = 10;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  vertical = false;
  error: string;
  success: string;
  isMotivationsView:boolean=false;
  isSkillsView:boolean=false;

  constructor(
    private translate: TranslateService,
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.businessform = this.formBuilder.group({
      scale: ['', Validators.compose([Validators.required])],
      skills: this.formBuilder.array([]),
      motivations: ['', Validators.compose([ Validators.maxLength(500)])]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onChange(skill: string, isChecked: boolean) {
    const skillsFormArray = <FormArray>this.businessform.controls.skills;
    if (isChecked) {
      skillsFormArray.push(new FormControl(skill));
    } else {
      let index = skillsFormArray.controls.findIndex(x => x.value == skill)
      skillsFormArray.removeAt(index);
    }
  }

  triggerView(event:any){
    this.isSkillsView=true;
    this.dataService.changeAssessmentView('EDUCATIONVIEW');
  }

  onViewChange(currentView:string){
    if(currentView=='motivations'){
      this.isMotivationsView=true;
    }
  }

}
