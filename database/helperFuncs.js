module.exports = {
  timeToStringHour: function(twentyFourFormat) {
    if (twentyFourFormat < 12) {
      return twentyFourFormat.toString() + 'AM';
    } else if (twentyFourFormat > 12) {
      return (twentyFourFormat - 12).toString() + 'PM';
    } else {
      return '12PM';
    }
  },

  cancellationMessage: function(cancellationNumber) {
    let messages = ['', 'Flexible', 'Moderate', 'Strict', 'Super Strict (30 days)'];

    return messages[cancellationNumber];
  },

  arrivalType: function(onArrivalNum) {
    let types = ['', 'Meet and greet', 'Go straight to camp'];

    return types[onArrivalNum];
  },

  lodgingTypes: function(lodgingNum) {
    let types = ['', 'Canvas Tent', 'Tent', 'BYOT', 'Cabin', 'Campers, Trailers, RVs'];

    return types[lodgingNum];
  },

  kitchenTypes: function(listOfKichens) {
    let types = ['', 'grill over firepit', 'bbq', 'oven', 'fridge', 'shared', 'private'];

    let hasTypes = []
    for (let i = 0; i < listOfKichens.length; i++) {
      let currType = listOfKichens[i];
      hasTypes.push(types[currType]);
    }

    return hasTypes.join(', ');
  },

  hasKitchen: function(kitchenObj) {
    if (!kitchenObj.available) {
      return {available: false}
    } else {
      let kitchen = {};
      kitchen.available = true;
      kitchen.description = kitchenObj.description;
      kitchen.types = module.exports.kitchenTypes(kitchenObj.types);

      return kitchen;
    }
  },

  potableWaterTypes: ['', 'tap', 'hose', 'bottled'],

  hasShower: function(showerObj) {
    if (!showerObj.available) {
      return {available: false}
    } else {
      let shower = {};
      shower.available = true;
      shower.description = showerObj.description;
      shower.types = 'Hot Water';

      return shower;
    }
  },

  hasBins: function(binsObj) {
    if (!binsObj.available) {
      return {available: false}
    } else {
      let bins = {};
      bins.available = true;
      bins.description = binsObj.description;
      bins.types = module.exports.binTypes(binsObj.types);

      return bins;
    }
  },

  binTypes: function(listOfBins) {
    let types = ['', 'trash bin', 'compost bin', 'recycling bin'];

    let hasTypes = [];
    for (let i = 0; i < listOfBins.length; i++) {
      let currType = listOfBins[i];
      hasTypes.push(types[currType]);
    }

    return hasTypes.join(', ');
  }
}