type Step = 'idle' | 'started' | 'location' | 'neighborhood' | 'street' | 'number' | 'cep' | 'confirmation';

export interface ChatState {
  step: Step;
  dados: any[];
}