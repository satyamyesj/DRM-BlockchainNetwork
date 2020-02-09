/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Request Access
 * @param {org.ownershiprecord.network.RequestAccess} RequestAccess
 * @transaction
 */
async function RequestAccess(tx) {
    var factory=getFactory();
    var newPendingRequest=factory.newResource('org.ownershiprecord.network', 'PendingRequest', tx.requestId);
    newPendingRequest.accessType=tx.accessType
    newPendingRequest.fileAsset=tx.fileAsset
    newPendingRequest.fileUser=tx.fileUser
    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.ownershiprecord.network.PendingRequest');
    // Add the asset in the asset registry.
    await assetRegistry.add(newPendingRequest);
}


/**
 * GrantAccess
 * @param {org.ownershiprecord.network.GrantAccess} GrantAccess
 * @transaction
 */

async function GrantAccess(tx){
    var factory=getFactory();
    var newFileRight=factory.newResource('org.ownershiprecord.network', 'FileRight', tx.rightId);
    newFileRight.accessType=tx.pendingRequest.accessType
    newFileRight.fileAsset=tx.pendingRequest.fileAsset
    newFileRight.fileUser=tx.pendingRequest.fileUser
    // Get the asset registry for the asset.
    var assetRegistry = await getAssetRegistry('org.ownershiprecord.network.FileRight');
    // Add the asset in the asset registry.
    await assetRegistry.add(newFileRight); 
    // Get the asset registry to delete pending request.
    assetRegistry= await getAssetRegistry('org.ownershiprecord.network.PendingRequest');
    // Delete the pending request.
    await assetRegistry.remove(tx.pendingRequest)
}