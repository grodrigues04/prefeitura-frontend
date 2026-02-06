import { signal } from '@preact/signals-react';

export const modalAberto = signal(false);
export const modalExclusao = signal(false);
export const atualizar = signal(false);
export const cadastroAlerta = signal(false);
export const dadosPacientes = signal([]);
export const dadosTabela = signal([]);
export const page = signal(0);
export const ehAlteracao = signal(false);
export const pacienteSelecionado = signal(null);
export const filtroNome = signal(null);
export const filtroLetra = signal('');
