package org.iu.ads.utility;

import org.junit.Assert;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

public class TestPostBodyParser {

    public PostBodyParser postBodyParser = new PostBodyParser();

    @Test
    public void testPostBodyParser() {
        Map<String, String> parameterMap = new HashMap<>();
        String postBody = "{\"Name\": \"/dreamy_faraday\",\n" +
                "        \"RestartCount\": 0,\n" +
                "        \"Driver\": \"overlay2\",\n" +
                "        \"Platform\": \"linux\"}";
        postBodyParser.populatePostBody(parameterMap, postBody);

        Assert.assertEquals(parameterMap.get("Name"), "/dreamy_faraday");
        Assert.assertEquals(parameterMap.get("Driver"), "overlay2");
        Assert.assertEquals(parameterMap.get("Platform"), "linux");

        Assert.assertNull(parameterMap.get("RestartCount"));
    }

    @Test
    public void testPostBodyParser_nonStringValues() {
        Map<String, String> parameterMap = new HashMap<>();
        String postBody = "{\"RestartCount\": 0,\n}";
        postBodyParser.populatePostBody(parameterMap, postBody);

        Assert.assertNull(parameterMap.get("RestartCount"));
        Assert.assertTrue(parameterMap.isEmpty());
    }
}
