const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
module.exports = {
    project: appDirectory,
    dist: path.resolve(appDirectory, 'build'),
    public: path.resolve(appDirectory, 'public'),
    template: path.resolve(appDirectory, 'public/index.html'),
    src: path.resolve(appDirectory, 'src'),
}