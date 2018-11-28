
function render(data, model){
    return data.replace(/{[a-zA-Z]+}/g, function(val){
        return model[val.substring(1, val.length - 1)] || '';
    });
};

module.exports = render;


console.log(render('{dasdsa},dasdsaddasd{key}', {key: 1}));


