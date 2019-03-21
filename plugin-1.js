console.log('plugin-1 loaded');

function apply(hook) {
  hook('onCreate', function(ctx) {
    console.log('plugin-1 onCreate');
    console.log(ctx);
  });
  hook('onStart', function(ctx) {
    return new Promise(resolve => {
      setTimeout(_ => {
        console.log('plugin-1 onCreate');
        console.log(ctx);
        resolve();
      }, 2000);
    });
  });
}

module.exports = {
  apply
};
