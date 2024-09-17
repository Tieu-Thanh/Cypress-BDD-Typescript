import { Then } from "@badeball/cypress-cucumber-preprocessor";
import WindowHandler from "../../support/window-handler";

Then('I should be redirected to the homepage', () => {
    WindowHandler.assertUrlContains('/');
})
