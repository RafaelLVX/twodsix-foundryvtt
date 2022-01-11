import {AbstractTwodsixActorSheet} from "./AbstractTwodsixActorSheet";

export class TwodsixShipSheet extends AbstractTwodsixActorSheet {

  /**
   * Return the type of the current Actor
   * @type {String}
   */
  get actorType():string {
    return this.actor.data.type;
  }

  /** @override */
  getData():any {
    const data:any = super.getData();
    data.dtypes = ["String", "Number", "Boolean"];

    // Prepare items.
    if (this.actor.data.type == 'ship') {
      data.data.storage = data.actor.items;
      AbstractTwodsixActorSheet._prepareItemContainers(this.actor.items, data);
    }

    // Add relevant data from system settings
    data.data.settings = {
      showSingleComponentColumn: game.settings.get('twodsix', 'showSingleComponentColumn')
    };
    return data;
  }

  /** @override */
  static get defaultOptions():ActorSheet.Options {
    return mergeObject(super.defaultOptions, {
      classes: ["twodsix", "ship", "actor"],
      template: "systems/twodsix/templates/actors/ship-sheet.html",
      width: 825,
      height: 674,
      resizable: false,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "crew"}],
      scrollY: [".ship-crew", ".ship-component", ".ship-storage", ".storage-wrapper", ".finances", ".ship-notes"]
    });
  }
}
