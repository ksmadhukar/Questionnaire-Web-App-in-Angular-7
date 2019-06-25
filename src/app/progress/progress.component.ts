import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-percentage-block",
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.scss"]
})
export class ProgressComponent implements OnInit {
  @Input() Percentage;
  constructor() {}

  ngOnInit() {}
}
