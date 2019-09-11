import { Component } from "@angular/core";

@Component({
    template: `
        <div class="container padded">
            <div class="row">
                <div class="col-sm-6 col-sm-offset-3">
                    <div class="row">
                        <div class="col-12" style="text-align: center">
                            <h1>Cms Lite Sign In</h1>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-12">
                            <sign-in></sign-in>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class LogInComponent { }