import { Component, Input } from "@angular/core";
import { MatExpansionPanel } from "@angular/material/expansion";

@Component({
  selector: 'portal',
  templateUrl: 'portal.component.html',
  styleUrls: ['portal.component.css']
})
export class PortalComponent {
  @Input() expanded: boolean = false;
  @Input() hideToggle: boolean = false;
}