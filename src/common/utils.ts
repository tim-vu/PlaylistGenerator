export const toQuery = (params: Object) => {

  const entries = Object.entries(params);

  return entries.reduce<string>((query: string, entry : [string, any], index: number) => {

    query += `${entry[0]}=${encodeURI(entry[1])}`;

    if(index < entries.length - 1)
      query += "&";

    return query;
  }, "");
}

interface Params {
  [key: string]: any;
}

export const toParams = (paramString: string) : Params => {

  return paramString.split("&").reduce((acc : Params, curr: string) => {

    const split = curr.split("=");

    if(split.length !== 2)
      return acc;

    acc[split[0]] = split[1];
    return acc;
  }, {})
};