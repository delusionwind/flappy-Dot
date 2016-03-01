// Add files in res
var res = {
    dot_png: 'res/images/dot.png',
    pillar_top_png: 'res/images/pillar-top.png',
    pillar_bottom_png: 'res/images/pillar-bottom.png'
};

// Leave the original code for assigning g_resources untouched.
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
