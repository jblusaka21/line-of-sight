const HECTOLITER_TO_CASE = 0.09;

export interface LOSData {
  sellOutHl: number;
  sellInHl: number;
  desiredLos: number;
  pendingOrders: number;
  receivedStock: number;
}

export interface LOSResult {
  currentLos: number;
  sellOutCases: number;
  sellInCases: number;
  casesNeeded: number;
  newSellOutHl: number;
  newSellOutCases: number;
  losAfterSelling: number;
  newSellInHl: number;
  newSellInCases: number;
  losAfterReceiving: number;
  adjustedSellOut: number;
  predictedLos: number;
  losStatus: 'critical' | 'optimal' | 'caution' | 'high';
}

export function calculateLOS(data: LOSData): LOSResult {
  const { sellOutHl, sellInHl, desiredLos, pendingOrders, receivedStock } = data;

  if (!sellOutHl || !sellInHl || !desiredLos) {
    return getEmptyResult();
  }

  const sellOutCases = sellOutHl / HECTOLITER_TO_CASE;
  const sellInCases = sellInHl / HECTOLITER_TO_CASE;
  const currentLos = (sellOutHl / sellInHl) * 100;

  const casesNeeded = (desiredLos * sellInCases) / 100 - sellOutCases;
  const newSellOutHl = (casesNeeded * HECTOLITER_TO_CASE) + sellOutHl;
  const newSellOutCases = newSellOutHl / HECTOLITER_TO_CASE;
  const losAfterSelling = (newSellOutHl / sellInHl) * 100;

  const newSellInHl = receivedStock > 0 ? (receivedStock * HECTOLITER_TO_CASE) + sellInHl : sellInHl;
  const newSellInCases = newSellInHl / HECTOLITER_TO_CASE;
  const losAfterReceiving = (sellOutHl / newSellInHl) * 100;

  const adjustedSellOut = sellOutCases + pendingOrders;
  const predictedLos = (adjustedSellOut / sellInCases) * 100;

  const losStatus = getLosStatus(currentLos);

  return {
    currentLos,
    sellOutCases,
    sellInCases,
    casesNeeded,
    newSellOutHl,
    newSellOutCases,
    losAfterSelling,
    newSellInHl,
    newSellInCases,
    losAfterReceiving,
    adjustedSellOut,
    predictedLos,
    losStatus,
  };
}

function getLosStatus(los: number): 'critical' | 'optimal' | 'caution' | 'high' {
  if (los < 93) return 'critical';
  if (los <= 103) return 'optimal';
  if (los <= 105) return 'caution';
  return 'high';
}

function getEmptyResult(): LOSResult {
  return {
    currentLos: 0,
    sellOutCases: 0,
    sellInCases: 0,
    casesNeeded: 0,
    newSellOutHl: 0,
    newSellOutCases: 0,
    losAfterSelling: 0,
    newSellInHl: 0,
    newSellInCases: 0,
    losAfterReceiving: 0,
    adjustedSellOut: 0,
    predictedLos: 0,
    losStatus: 'optimal',
  };
}

export function getSuggestion(status: string, currentLos: number, desiredLos: number): string {
  if (status === 'critical') {
    return 'LOS is below target. Increase sales or reduce incoming stock to reach your desired LOS.';
  }
  if (status === 'optimal') {
    return 'Healthy LOS! You are within the target range. Maintain your current sales rate.';
  }
  if (status === 'caution') {
    return 'LOS is slightly high. Monitor stock closely and consider adjusting delivery schedules.';
  }
  if (status === 'high') {
    return 'LOS is above target. Consider reducing stock or delaying deliveries to normalize levels.';
  }
  return 'Monitor your LOS performance.';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'critical':
      return 'from-red-600 to-red-700';
    case 'optimal':
      return 'from-green-600 to-green-700';
    case 'caution':
      return 'from-orange-600 to-orange-700';
    case 'high':
      return 'from-blue-600 to-blue-700';
    default:
      return 'from-slate-600 to-slate-700';
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case 'critical':
      return 'bg-red-50 border-red-200';
    case 'optimal':
      return 'bg-green-50 border-green-200';
    case 'caution':
      return 'bg-orange-50 border-orange-200';
    case 'high':
      return 'bg-blue-50 border-blue-200';
    default:
      return 'bg-slate-50 border-slate-200';
  }
}

export function getStatusTextColor(status: string): string {
  switch (status) {
    case 'critical':
      return 'text-red-700';
    case 'optimal':
      return 'text-green-700';
    case 'caution':
      return 'text-orange-700';
    case 'high':
      return 'text-blue-700';
    default:
      return 'text-slate-700';
  }
}
