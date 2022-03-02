// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiPromise } from '@polkadot/api';
import { ApiDecoration } from '@polkadot/api/types';
import {
  Entity,
  SubstrateBlock,
  SubstrateEvent,
  SubstrateExtrinsic,
} from '@subql/types';
import algosdk from 'algosdk';

export type ApiAt = ApiDecoration<'promise'> & { rpc: ApiPromise['rpc'] };

export interface ApiWrapper {
  init: () => Promise<void>;
  getGenesisHash: () => string;
  getRuntimeChain: () => string;
  getSpecName: () => string;
  getFinalizedBlockHeight: () => Promise<number>;
  getLastHeight: () => Promise<number>;
  fetchBlocksBatches: (
    bufferBlocks: number[],
    overallSpecNumber?: number,
  ) => Promise<AlgorandBlock[] | BlockContent[]>;
}

/****************************************************/
/*             ALGORAND SPECIFIC TYPES              */
/****************************************************/

export type AlgorandBlock = Record<string, any>;

export type AlgorandOptions = {
  token: string;
  server: string;
  port: number;
};

export interface AlgorandApi {
  client: algosdk.Algodv2;
  lastHeader: any; // Record<string, Buffer | number | string>;
}

/****************************************************/
/*             AVALANCHE SPECIFIC TYPES             */
/****************************************************/

export type AvalancheOptions = {
  ip: string;
  port: number;
  protocol: string;
  networkID: number;
  chainName: string;
};

/****************************************************/
/*             SUBSTRATE SPECIFIC TYPES             */
/****************************************************/

export interface BlockContent {
  block: SubstrateBlock;
  extrinsics: SubstrateExtrinsic[];
  events: SubstrateEvent[];
}

export enum OperationType {
  Set = 'Set',
  Remove = 'Remove',
}

export type OperationEntity = {
  operation: OperationType;
  entityType: string;
  data: Entity | string;
};
