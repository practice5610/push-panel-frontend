import getReports from "./getReportList";
import getSites from "./getStieList";
import getTemplates from "./getTemplateList";
import createTemplate from "./createTemplate";
import createSite from "./createSite";
import deleteTemplate from "./deleteTemplate";
import deleteSite from "./deleteSite";

export default class customDataProvider {
  constructor(API_URL) {
    this.API_URL = API_URL;
  }
  getList(resource, params) {
    try {
      if (resource === "Reports") {
        return getReports(this.API_URL, resource, params);
      }
      if (resource === "Templates") {
        return getTemplates(this.API_URL, resource, params);
      }
      if (resource === "Sites") {
        return getSites(this.API_URL, resource, params);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getOne(resource, params) {
    try {
    } catch (err) {
      console.log(err);
    }
  }
  async getMany() {}
  getManyReference() {}
  create(resource, params) {
    if (resource === "Templates") {
      return createTemplate(this.API_URL, params);
    }
    if (resource === "Sites") {
      return createSite(this.API_URL, params);
    }
  }
  async update(resource, params) {
    try {
    } catch (err) {
      console.log(err);
    }
  }
  updateMany() {}
  delete(resource, params) {
    return deleteTemplate(this.API_URL, params);
  }
  async deleteMany(resource, params) {
    try {
      await params.ids.forEach(async (id) => {
        if (resource === "Templates") {
          await deleteTemplate(this.API_URL, { id: id });
        }
        if (resource === "Sites") {
          await deleteSite(this.API_URL, { id: id });
        }
      });

      return { data: [] };
    } catch (err) {
      console.log(err);
    }
  }
}
