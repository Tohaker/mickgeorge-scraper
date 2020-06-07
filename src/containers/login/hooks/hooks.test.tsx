import { renderHook, act } from "@testing-library/react-hooks";

describe("Login Hooks", () => {
  let useLoading: () => any;
  let useUrlList: () => any;

  const mockSend = jest.fn();
  const mockInvoke = jest.fn();

  beforeEach(() => {
    window.require = require;

    jest.resetAllMocks();

    jest.mock("electron", () => ({
      ipcRenderer: {
        send: mockSend,
        invoke: mockInvoke,
      },
    }));

    useLoading = require(".").useLoading;
    useUrlList = require(".").useUrlList;
  });

  describe("useLoading", () => {
    it("should set loading to false if success if false", () => {
      const { result } = renderHook(() => useLoading());

      expect(result.current.loading).toBe(false);
      expect(result.current.success).toBe(true);

      act(() => {
        result.current.setLoading(true);
        result.current.setSuccess(false);
      });

      expect(result.current.loading).toBe(false);
    });

    it("should not change loading if success is true", () => {
      const { result } = renderHook(() => useLoading());

      expect(result.current.loading).toBe(false);
      expect(result.current.success).toBe(true);

      act(() => {
        result.current.setLoading(true);
        result.current.setSuccess(true);
      });

      expect(result.current.loading).toBe(true);
    });
  });

  describe("useUrlList", () => {
    let response: Array<string>;

    beforeEach(() => {
      response = ["url1", "url2"];
      mockInvoke.mockImplementation((key, value) => {
        if (value === "urls") return Promise.resolve(response);
        if (value === "selectedUrl") return Promise.resolve(response[0]);
      });
    });

    it("should set the initial state on render", async () => {
      const { result, waitForNextUpdate } = renderHook(() => useUrlList());

      await waitForNextUpdate();

      expect(result.current.initialList).toEqual(response);
      expect(result.current.urlList).toEqual(response);
      expect(result.current.selectedUrl).toBe(response[0]);
    });

    it("should send the selectedUrl to the ipcRenderer", async () => {
      const { result, waitForNextUpdate } = renderHook(() => useUrlList());

      await waitForNextUpdate();

      expect(result.current.selectedUrl).toBe("url1");

      act(() => {
        result.current.setSelectedUrl("new url");
      });

      expect(result.current.selectedUrl).toBe("new url");
    });

    describe("given dispatch is called", () => {
      it("should send an new value when added", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useUrlList());

        await waitForNextUpdate();

        act(() => {
          result.current.dispatch({
            type: "ADD",
            payload: { newValue: "new url" },
          });
        });

        const expected = ["url1", "url2", "new url"];

        expect(result.current.urlList).toEqual(expected);
        expect(mockSend).toBeCalledWith("setStoreValue", {
          key: "urls",
          value: expected,
        });
      });

      it("should send an updated list when removed", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useUrlList());

        await waitForNextUpdate();

        act(() => {
          result.current.dispatch({
            type: "REMOVE",
            payload: { newValue: "url1" },
          });
        });

        const expected = ["url2"];

        expect(result.current.urlList).toEqual(expected);
        expect(mockSend).toBeCalledWith("setStoreValue", {
          key: "urls",
          value: expected,
        });
      });

      it("should reset to the original list", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useUrlList());

        await waitForNextUpdate();

        const initialList = result.current.initialList;

        act(() => {
          result.current.dispatch({
            type: "RESET",
            payload: { newValue: "", initialValue: initialList },
          });
        });

        expect(result.current.urlList).toEqual(initialList);
        expect(mockSend).toBeCalledWith("setStoreValue", {
          key: "urls",
          value: initialList,
        });
      });
    });
  });
});
