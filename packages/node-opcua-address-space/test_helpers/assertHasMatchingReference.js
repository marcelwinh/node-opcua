const assert = require("node-opcua-assert").assert;


const Reference = require("../src/reference").Reference;
const sameNodeId = require("node-opcua-nodeid").sameNodeId;

/**
 * asserts that the provided reference exists in the node references
 *
 * @method assertHasMatchingReference
 *
 * @param node
 * @param reference (Reference}
 * @param reference.referenceType {String}
 * @param reference.nodeId        {NodeId}
 * @param reference.isForward     {Boolean}
 *
 * @example:
 *
 *     assertHasMatchingReference(node,{ referenceType: "Organizes",i sForward:true, nodeId: "ns=1,i=12" });
 *
 *
 */
function assertHasMatchingReference(node, reference) {

    const addressSpace = node.addressSpace;

    const normalizedReference = addressSpace.normalizeReferenceType(reference);
    assert(typeof normalizedReference.referenceType === "string");

    let refs = node.findReferences(normalizedReference.referenceType,normalizedReference.isForward);

    refs = refs.filter(function(ref){
        return sameNodeId(ref.nodeId,normalizedReference.nodeId);
    });

    const dispOpts = { addressSpace: addressSpace};

    if (refs.length !== 1) {
        throw new Error(" Cannot find reference " + ( new Reference(normalizedReference).toString(dispOpts)) );
    }
    assert(refs.length === 1);

}
module.exports = assertHasMatchingReference;
