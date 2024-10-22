const DataGridXL = require('@utils/datagripxl.js');
const datagridxlPlugin = {
    install(app) {
      app.config.globalProperties.$DataGridXL = DataGridXL;
    }
  };
  
export default datagridxlPlugin;