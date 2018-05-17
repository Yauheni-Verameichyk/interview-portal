package by.interview.portal.utils.search;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.data.jpa.domain.Specification;

public class SearchUtils {

    public static <T> Specification<T> getSearchSpecifications(String search) {
        return fillSpecificationBuilder(search, new SpecificationBuilder<T>()).build();
    }

    private static <T> SpecificationBuilder<T> fillSpecificationBuilder(String search,
            SpecificationBuilder<T> builder) {
        Pattern pattern = Pattern.compile("(OR##|AND##){0,2}(\\w+?)(#|:|<>|<|>|=|!)(.+?);");
        Matcher matcher = pattern.matcher(search + ";");
        while (matcher.find()) {
            builder.with(matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4));
        }
        return builder;
    }
}
