import {describe, expect, it} from "vitest"
import {formatDate} from "./dates"

describe("formatDate", () => {
  it("formats an ISO string as 'DD Mon YYYY'", () => {
    expect(formatDate("2022-09-04T16:00:36.854Z")).toBe("04 Sep 2022")
  })

  it("formats in UTC regardless of the timezone offset", () => {
    expect(formatDate("2022-12-31T23:30:00-05:00")).toBe("01 Jan 2023")
  })

  it("accepts Date objects", () => {
    expect(formatDate(new Date(Date.UTC(2020, 0, 5)))).toBe("05 Jan 2020")
  })
})
