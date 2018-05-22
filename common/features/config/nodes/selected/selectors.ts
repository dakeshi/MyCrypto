import { AppState } from 'features/reducers';
import { getNodes } from '../derivedSelectors';

export function getSelectedNode(state: AppState) {
  return getNodes(state).selectedNode;
}

export function getPreviouslySelectedNode(state: AppState) {
  return getSelectedNode(state).prevNode;
}

export function isNodeChanging(state: AppState): boolean {
  return getSelectedNode(state).pending;
}

export function getNodeId(state: AppState): string {
  return getSelectedNode(state).nodeId;
}