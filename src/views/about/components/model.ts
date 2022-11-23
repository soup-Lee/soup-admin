import pkg from "@/../package.json";
// TODO: 此处的 ~/ 似乎失去了作用，暂时用 @/ 代替，有时间再看看是什么原因

/** npm依赖包版本信息 */
export interface PkgVersionInfo {
  name: string;
  version: string;
}

interface Package {
  name: string;
  version: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  [key: string]: any;
}

interface PkgJson {
  name: string;
  version: string;
  dependencies: PkgVersionInfo[];
  devDependencies: PkgVersionInfo[];
}

const pkgWithType = pkg as Package;

const transformVersionData = (tuple: [string, string]): PkgVersionInfo => {
  const [name, version] = tuple;
  return {
    name,
    version,
  };
};

export const pkgJson: PkgJson = {
  name: pkgWithType.name,
  version: pkgWithType.version,
  dependencies: Object.entries(pkgWithType.dependencies).map((item) => transformVersionData(item)),
  devDependencies: Object.entries(pkgWithType.devDependencies).map((item) =>
    transformVersionData(item),
  ),
};
