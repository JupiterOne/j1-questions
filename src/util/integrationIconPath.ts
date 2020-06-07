const ICON_BASE_URL = 'https://raw.githubusercontent.com/JupiterOne/docs/master/assets/icons/';

export default function integrationIconPath(integrationType: string): string {
  if (integrationType === 'cbdefense') {
    return `${ICON_BASE_URL}carbon-black-psc.svg`;
  } 
  return `${ICON_BASE_URL}${integrationType.replace(/\s|_/g, '-')}.svg`;
}