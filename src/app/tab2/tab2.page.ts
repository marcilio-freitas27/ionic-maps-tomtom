import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import tt from '@tomtom-international/web-sdk-maps';
import { Geolocation, Position } from '@capacitor/geolocation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ExploreContainerComponent,
    HttpClientModule,
    CommonModule,
  ],
})
export class Tab2Page {
  latitute: any;
  longetude: any;
  map!: any;
  result!: any;
  searchResultMarker!: any;
  constructor(private http: HttpClient) {
    this.geolocation();
    this.map = tt.map({
      key: 'qWs3zqjNxKQGEexONPwFAxRE5knGm6K7',
      container: 'map',
      center: new tt.LngLat(-35, -5),
      zoom: 2,
    });
    let marker = new tt.Marker()
      .setLngLat(new tt.LngLat(-35, -5))
      .addTo(this.map);
  }

  async geolocation() {
    // await Geolocation.requestPermissions();
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitute = coordinates.coords.latitude;
    this.longetude = coordinates.coords.longitude;
  }

  async search(query: any) {
    const coordinates: Position = await Geolocation.getCurrentPosition();
    const res: any = await this.http
      .get(
        `https://api.tomtom.com/search/2/search/${query}.json?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&key=qWs3zqjNxKQGEexONPwFAxRE5knGm6K7`
      )
      .toPromise();
    this.result = res.results;
  }

  locateResult(place: any) {
    this.searchResultMarker = new tt.Marker({ color: 'orange' })
      .setLngLat([place.position.lon, place.position.lat])
      .addTo(this.map);
    this.map.setCenter({ lng: place.position.lon, lat: place.position.lat });
    this.map.setZoom(15);
  }
}
