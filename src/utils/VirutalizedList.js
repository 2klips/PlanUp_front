import React from 'react';
import { FlatList } from 'react-native';

const VirtualizedView = (props) => {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => "dummy"}
      renderItem={null}
      ListHeaderComponent={() => <>{props.children}</>}
      {...props}
    />
  );
};

export default VirtualizedView;
