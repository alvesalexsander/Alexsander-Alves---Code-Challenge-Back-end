import { PtBR } from './pt-BR';
import { ApplicationMessage, ApplicationMessageOptions } from './messages.abstract';

const languages = {
  'pt-BR': PtBR
}

export function getMessage(message: ApplicationMessageOptions, payload?: any, languageCode = 'pt-BR'): string {
  if (!languages[languageCode]) {
    return `Unsupported language: "${languageCode}". Using default: "pt-BR". ${resolveApplicationMessage(languages['pt-BR'][message], payload)}`;
  }
  return resolveApplicationMessage(languages['pt-BR'][message], payload);
}

function resolveApplicationMessage(message: ApplicationMessage, payload?: any): string {
  if (typeof message === 'string') {
    return message;
  }
  return message(payload);
}