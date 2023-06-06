import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { AdDirective } from './ad.directive';
import { AdItem } from './ad-item';
import { AdComponent } from './ad.component';


//In the template the adHost directive is added, thats where Angular knows where to inject the template
@Component({
  selector: 'app-ad-banner',
  template: `
    <div class="ad-banner-example">
      <h3>Advertisements</h3>
      <ng-template adHost></ng-template>
    </div>
  `
})
export class AdBannerComponent implements OnInit, OnDestroy {

  //AdItem objects specify the type of component to load and any data to bind to the component
  //Getting components from parent
  @Input() ads: AdItem[] = [];

  currentAdIndex = -1;

  //Reference to our AdDirective
  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;

  private clearTimer: VoidFunction | undefined;

  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    this.clearTimer?.();
  }

  loadComponent() {

    //iterate through
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    //clear current container ref
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    //Setting (adding the component to the template)
    const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component);
    componentRef.instance.data = adItem.data;
  }

  //Loads new component every three seconds
  getAds() {
    const interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
    this.clearTimer = () => clearInterval(interval);
  }
}
