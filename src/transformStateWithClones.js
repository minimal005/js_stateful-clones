'use strict';
/*
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const updateState = { ...state };
  const updateActions = [];

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(updateState, key.extraData);
      updateActions.push({ ...updateState });
    }

    if (key.type === 'removeProperties') {
      for (const item of key.keysToRemove) {
        delete updateState[item];
      }
      updateActions.push({ ...updateState });
    }

    if (key.type === 'clear') {
      for (const a in updateState) {
        delete updateState[a];
      }
      updateActions.push({ ...updateState });
    }
  }

  return updateActions;
}

module.exports = transformStateWithClones;
