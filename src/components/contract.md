Bar Chart

```
{
    title: 'Bar Chart Example',
    labels: ['Label 1', 'Label 2', 'Label 3'],
    data: [
      {
        groupId: 'Label 1',
        value: 30
      },
      {
        groupId: 'Label 2',
        value: 80
      },
      {
        groupId: 'Label 3',
        value: 35
      }
    ],
    orientation: 'horizontal'
}
```

Line Chart

```
{
    title: 'Line Chart',
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6'],
    data: [
      { name: 'Line 01', values: [120, 132, 101, 134, 90, 230, 210] },
      { name: 'Line 02', values: [220, 182, 191, 234, 290, 330, 310] },
      { name: 'Line 03', values: [150, 232, 201, 154, 190, 330, 410] },
      { name: 'Line 04', values: [320, 332, 301, 334, 390, 330, 320] },
      { name: 'Line 05', values: [820, 932, 901, 934, 1290, 1330, 1320] }
    ]
}
```

Pie Chart

```
{
    title: 'Pie Chart',
    data: [
      { value: 1048, name: 'Pie Area 01' },
      { value: 735, name: 'Pie Area 02' },
      { value: 580, name: 'Pie Area 03' },
      { value: 484, name: 'Pie Area 04' },
      { value: 300, name: 'Pie Area 05' }
    ]
}
```

Stacked Bar Chart

```
{
    title: 'Stacked Bar Chart',
    labels: ['Group A'],
    series: [
      {
        name: 'Category 1',
        data: [100]
      },
      {
        name: 'Category 2',
        data: [36]
      },
      {
        name: 'Category 3',
        data: [12]
      }
    ]
}
```
