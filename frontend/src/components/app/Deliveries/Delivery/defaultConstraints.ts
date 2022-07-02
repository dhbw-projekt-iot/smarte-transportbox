export const coolFreightConstraints = {
  temperature: {
    criticalMaximum: -2,
    criticalMinimum: -30,
    warningThresholdHigh: 0,
    warningThresholdLow: -28,
    exceedCountUntilIncident: 10,
    exceedMinutesUntilIncident: 5,
  },
  humidity: {
    criticalMaximum: 80,
    criticalMinimum: 0,
    warningThresholdHigh: 75,
    warningThresholdLow: 0,
    exceedCountUntilIncident: 10,
    exceedMinutesUntilIncident: 5,
  },
};

export const humidSensibleFreightConstraints = {
  temperature: {
    criticalMaximum: 50,
    criticalMinimum: 0,
    warningThresholdHigh: 45,
    warningThresholdLow: 2,
    exceedCountUntilIncident: 10,
    exceedMinutesUntilIncident: 5,
  },
  humidity: {
    criticalMaximum: 50,
    criticalMinimum: 0,
    warningThresholdHigh: 45,
    warningThresholdLow: 0,
    exceedCountUntilIncident: 10,
    exceedMinutesUntilIncident: 5,
  },
};

export const fragileFreightConstraints = {
  vibration: {
    criticalMaximum: 50,
    criticalMinimum: 0,
    warningThresholdHigh: 45,
    warningThresholdLow: 2,
    exceedCountUntilIncident: 10,
    exceedMinutesUntilIncident: 5,
  },
  tilt: {
    criticalMaximum: 50,
    criticalMinimum: 0,
    warningThresholdHigh: 45,
    warningThresholdLow: 0,
    exceedCountUntilIncident: 10,
    exceedMinutesUntilIncident: 5,
  },
};
