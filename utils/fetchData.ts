const BASE_URL = "https://disease.sh/v3/covid-19"

export const fetchData = async <T>(path: string): Promise<T> => {
  const req = await fetch(`${BASE_URL}/${path}`)
  const res = await req.json()
  return res
}
