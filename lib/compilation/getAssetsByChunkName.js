/**
 * Extract assets with compiled content from compilation and groups them by chunk name.
 *
 * @param {Compilation} compilation
 * @returns {Object<string, Array<{path: string, content: string}>>}
 */
 function getAssetsByChunkName(compilation) {
  var compiledAssets = compilation.assets;
  var assetsByChunkName = compilation.getStats().toJson().assetsByChunkName;
  var chunkNames = Object.keys(assetsByChunkName);

  if (!chunkNames.length)
    return null;

  var chunks = {};
  chunkNames.forEach(function (chunkName) {
    var chunkAssets = assetsByChunkName[chunkName];
    var assets = [];

    if (typeof chunkAssets === 'string')
      chunkAssets = [chunkAssets];

    chunkAssets.forEach(function(assetPath) {
      assets.push({
        path: assetPath,
        content: compiledAssets[assetPath].source()
      });
    });

    chunks[chunkName] = assets;
  });

  return chunks;
}

module.exports = getAssetsByChunkName;